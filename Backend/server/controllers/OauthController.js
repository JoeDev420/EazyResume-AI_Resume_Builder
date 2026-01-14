import axios from "axios"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

//now to get the access_token, we need client id, client secret, resource url injected with code


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const createToken = (userId)=>{

  const token = jwt.sign({userId},process.env.JWT_SECRET,{ expiresIn: "7d" })

  return token


}

export const getToken = async (req,res)=>{




 try {
    

    const {code} = req.body


    const response = await axios.post(process.env.TOKEN_URI,{

      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: 'postmessage',  // Critical for popup flow
      grant_type: 'authorization_code',



    })


    const { access_token, id_token, refresh_token } = response.data


    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
      headers: { Authorization: `Bearer ${access_token}` },
    })


    const user = userInfo.data;







    //got the user. now check if they exist in the db, if they dont add them in. if they do, log them in. End with the
    //creation of jwt for the user.


    let userData = await User.findOne({email:user.email})

    
    if(!userData){  //create user in db

      userData = await User.create({email:user.email,name:user.name,profileImageUrl:user.picture})  //get the newUser so we can put their id in token

    } 

    //create token

    const token = createToken(userData._id)


    res.cookie("token",token,{

            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

        })



    res.status(200).json({success:true,message:"User Registered"})




    } catch (error) {

        console.log(error.message)

        return res.status(500).json({ error: "Google Login failed" })


    }



}