import { createRazorPayInstance } from "../config/razorpay.js";
import crypto from "crypto"
import User from "../models/User.js";

export const createOrder = async (req, res) => {




  try {
    const amount = 100; // ₹100

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayInstance = createRazorPayInstance();

    // ✅ USE AWAIT — NO CALLBACK
    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req,res)=>{

 try {
    

    const {razorpay_payment_id,
           razorpay_order_id,
           razorpay_signature} = req.body

    const userId = req.userId

    const body = razorpay_order_id+"|"+razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");


    if(expectedSignature!=razorpay_signature){

        return res.status(400).json({success:false,message:"Payment Failed"})

    }

    //mark user as premium

    const user = await User.findById(userId)

    if(!user){

        return res.status(400).json({success:false,message:"User not Found"})

    }

    user.premium = true

    await user.save();

    return res.status(200).json({success:true,message:"Payment Successful"})


    } catch (error) {

        console.log(error.message)

        return res.status(400).json({success:false,message:error.message})

    
    }



}
