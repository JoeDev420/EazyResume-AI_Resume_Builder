import express from "express"
import { atsScan, createResumeAI, enhanceData } from "../controllers/aiController.js"
import Userauth from "../middlewares/AuthenticateUser.js"
import resumeUpload from "../middlewares/ResumeMulter.js"



const aiRouter = express.Router()


aiRouter.post('/enhanceAi',Userauth,enhanceData)
aiRouter.post('/UploadResume',resumeUpload.single('resume'),Userauth,createResumeAI)
aiRouter.post('/ats-scan',Userauth,atsScan)


export default aiRouter