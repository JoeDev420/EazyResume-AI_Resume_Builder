import express from "express"
import Userauth from "../middlewares/AuthenticateUser.js"
import { changeTitle, createResume, createUploadedResume, deleteResume, getAllResumeById, getResumeById, getResumebySlug, updateImage, updateResume } from "../controllers/resumeController.js"
import upload from "../middlewares/Multer.js"
import optionalAuth from "../middlewares/OptionalAuth.js"
import { titleSchema,editSchema, validateResumeName } from "../middlewares/PartialResumeSchema.js"
import { validatePartialResume } from "../middlewares/PartialResumeValidation.js"
import { FullResumeValidation } from "../middlewares/FullResumeValidation.js"


const ResumeRouter = express.Router()

ResumeRouter.post('/add',validateResumeName(titleSchema),Userauth,createResume) //correct [check with profile pic]
ResumeRouter.put('/update',validatePartialResume,Userauth,updateResume) 
ResumeRouter.post('/createUploadedResume',Userauth,createUploadedResume) 
ResumeRouter.put('/updateAll',FullResumeValidation,Userauth,updateResume)
ResumeRouter.post('/updateImage',Userauth, upload.single('image'),updateImage)  //correct   
ResumeRouter.put('/titleChange',validateResumeName(editSchema),Userauth,changeTitle) //correct
ResumeRouter.get('/resumeData/:resumeId',Userauth,getResumeById) //correct
ResumeRouter.get('/ResumePreview/:resumeSlug',optionalAuth,getResumebySlug) //used by VIEW page to get data based on slug
ResumeRouter.get('/resumeGetAll',Userauth,getAllResumeById) //correct
ResumeRouter.delete('/delete/:resumeId',Userauth,deleteResume) //correct

export default ResumeRouter
