    import User from "../models/User.js"
    import bcrypt from "bcrypt"
    import jwt from "jsonwebtoken"
    import Resume from "../models/Resume.js"
    import crypto from 'crypto';
    import nodemailer from 'nodemailer';


    const generateToken = (userId)=>{

            const token = jwt.sign({userId},process.env.JWT_SECRET)

            return token;


        }


    export const RegisterUser = async (req,res)=>{


        try {
            

        const {name,email,password} = req.body;


        const user = await User.findOne({email})


        if(user){

            

            return res.status(400).json({message:"User already exists"})

        }

        //if new user, create a hash of their password and create a new user in the database


        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({name,email,password:hashedPassword})

        const token  = generateToken(newUser._id);

        newUser.password = undefined

        res.cookie("token", token, {

            httpOnly: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: true,       // MUST be true in production
        });


        return res.status(201).json({message:"User Registered",token,user:newUser})


        } catch (error) {

            console.log(error)

            return res.status(400).json({message:error.message})

            
        }
        


    }


    export const LoginUser = async(req,res)=>{


        //AFTER login authentication happens in which you verify the token you gave to the user during login and it all other protected routes. 
        //token verification is also done in its own function. Dont mix up token verification and credential verification in
        //ONE function

    try {
        
        const {email,password} = req.body

        const user = await User.findOne( {email} )

        if(!user){

         

            return res.status(400).json({ message:"Invalid username or password" })

        }

        const validPassword = await user.comparePassword(password)

        if(!validPassword){


            return res.status(400).json({ message:"Invalid username or password"  })


        }

        //if username and password are valid give the user a token 

        const token = generateToken(user._id)

     

        user.password = undefined

        res.cookie("token", token, {        //login sends a cookie to the user's browser. now that the 

            httpOnly: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: true,       // MUST be true in production

        });


        return res.status(200).json({message:"User Verified",token})

        
    
    } catch (error) {

       return  res.status(400).json({message:error.message})

        
    }



    }

    export const LogoutUser = async(req,res)=>{

    try {
        

    if(req.cookies.token){

        res.clearCookie("token",{

          httpOnly: true,    
          sameSite: "strict",
          path: "/"

        })

    }



    return res.json({ success: true });


    } catch (error) {

        console.log(error.message)

        return res.json({success:false})
        
    }



    }


    // controller for getting user by id
// GET: /api/users/data

    export const getUserById = async (req, res) => {

        try {
            const userId = req.userId;

            // check if user exists
            const user = await User.findById(userId);
            if (!user) {
            return res.status(404).json({ message: "User not found" });
            }

            // return user (hide password)
            user.password = undefined;

            return res.status(200).json({ user });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
        

    };


    export const getUserResume = async(req,res)=>{


    try {
        
   
        const userId = req.userId


        const resumes = await Resume.find({userId})


        if(resumes){

            return res.status(200).json({resumes,message:"Resumes Returned"})

        }

        else{

            return res.status(200).json({resumes,message:"No resumes found"})

        }


        } catch (error) {
        
            
            return res.status(400).json({message:error.message})
    

        }


    }


    export const verifyUser = async (req, res) => {

        try {
            const user = await User.findById(req.userId).select("-password");

            if (!user) {
            return res.status(401).json({ success: false });
            }

            return res.status(200).json({
            success: true,
            user
            });
        } catch (error) {
            return res.status(500).json({ success: false });
        }
    };

    export const ForgotPassword = async(req,res)=>{
            

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for 587
                auth: {
                    user: process.env.EMAIL_USER, // your email                                         //add this
                    pass: process.env.EMAIL_PASS, // your email password or app password                //add this
                },
                });



        try{
            


                const {email}  = req.body


                if (!email) {
            // Always respond the same way for missing/invalid email
            return res.status(200).json({
                success: true,
                message: 'If an account exists, you will receive a password reset email shortly.',
            });
            }


                const user = await User.findOne({ email: email.toLowerCase() });


            if (!user) {
            // Respond the same way to avoid leaking user existence
            return res.status(200).json({
                success: true,
            });
            }


            
            // Generate a reset token     

            const resetToken = crypto.randomBytes(32).toString('hex');

            // Hash the token to store in DB
            const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

            // Set token and expiry in user's document (e.g., 10 minutes expiry)
            user.resetPasswordToken = hashedToken;
            user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

            
            await user.save();


                // Create reset link
                const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;  //add a frontEnd Url


                // Email content
                const mailOptions = {
                from: `"No Reply" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Password Reset Request',
                html: `
                    <p>You requested a password reset.</p>
                    <p>Click the link below to reset your password. This link will expire in 10 minutes.</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>If you did not request this, please ignore this email.</p>
                `,
                };


            await transporter.sendMail(mailOptions);

            return res.status(200).json({
                success: true,
            });

        
        } catch (error) {

        console.error('Reset Password error:', error);  //for testing only generated error in backend console 

            res.status(200).json({
                success: true,
            });

            
        }


        }

    export const ResetVerification = async(req,res)=>{


        try {

            const { token } = req.body;

            // 1️⃣ Token must exist
            if (!token) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset link.",
            });
            }

            // 2️⃣ Hash the incoming token
            const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");


            // 3️⃣ Find user by hashed token
            const user = await User.findOne({
            resetPasswordToken: hashedToken,
            });

            // 4️⃣ If no document found → invalid token
            if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset link.",
            });
            }

            // 5️⃣ Check expiry
            if (!user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset link has expired.",
            });
            }

            // 6️⃣ Token is valid
            return res.status(200).json({
            success: true,
            message: "Reset token verified.",
            });

        } catch (error) {

            console.error("ResetVerification error:", error);

            return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            });
        }

    
    };

    export const changePassword = async(req,res)=>{


        try {
            

            const {token,password} = req.body

        if(!token || !password){

            return res.status(400).json({success:false,message:"no token or password"})

        }

            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");


            const user = await User.findOne({resetPasswordToken:hashedToken})


            if(!user){

                return res.status(400).json({success:false,message:"user doesnt exist"})

            }

            //if user is found, change their password but only after verifying that the link is still valid

            if(user.resetPasswordExpires<Date.now()){

                return res.status(400).json({success:false,message:"Link Expired"})

            }

            const newPassword = await bcrypt.hash(password,10)

            user.password = newPassword

            user.resetPasswordToken = null

            user.resetPasswordExpires=null

            await user.save()

            res.status(200).json({success:true,message:"Password Reset Successfully"})


        } catch (error) {
            
            console.log(error.message)

            res.status(400).json({success:false,message:error.message})

            
        }



    }


    