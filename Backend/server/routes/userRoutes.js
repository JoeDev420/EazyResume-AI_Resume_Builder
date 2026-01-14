import express from "express"
import { changePassword, ForgotPassword, getUserById, getUserResume, LoginUser, LogoutUser, RegisterUser, verifyUser } from "../controllers/userController.js"
import Userauth from "../middlewares/AuthenticateUser.js"
import Resume from "../models/Resume.js"
import { loginSchema, signupSchema, validateUser } from "../middlewares/UserSchema.js"
import { ResetVerification } from "../controllers/userController.js"


const userRouter = express.Router()


userRouter.post('/register',validateUser(signupSchema),RegisterUser)
userRouter.post('/login',validateUser(loginSchema),LoginUser)
userRouter.post('/logout',LogoutUser)
userRouter.get('/data',Userauth,getUserById)
userRouter.get('/resumes',Userauth,getUserResume)
userRouter.post('/forgot-password',ForgotPassword)
userRouter.post('/resetTokenVerify',ResetVerification)
userRouter.post('/change-password',changePassword)
userRouter.get("/verification", Userauth, verifyUser); //needed for AuthContext. 





export default userRouter