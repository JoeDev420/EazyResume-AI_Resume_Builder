import fs from "fs";
import imagekit from "../config/ImageKit.js";
import Resume from "../models/Resume.js";
import slugify from "slugify"
import axios from "axios"
import fetch from "node-fetch";
import FormData from "form-data";
import mongoose from "mongoose";

const createSlug = (title,resumeId)=>{

  const base = slugify(title || "resume",{

      lower:true,
      strict:true

  })

  return `${base}-${resumeId.slice(-5)}`

}



export const createResume = async (req, res) => {


    try {

      const userId = req.userId;

      const { title,profileImageUrl } = req.body;
      

      let newresume = new Resume({
        userId,
        title,
        profileImageObject: {profileImageUrl}                   //whatever url is passed, is stored in profileImageObject
        
      })

      newresume.slug = createSlug(title,newresume._id.toString())

      await newresume.save()

      return res.status(201).json({
        success: true,
        resumeId: newresume._id,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

};


export const createUploadedResume = async (req, res) => {
  try {
    

    const userId = req.userId;
    if (!userId) throw new Error("UserId missing");

    let data = req.body;
    if (!data || typeof data !== "object") {
      throw new Error("Invalid request body");
    }

    if (typeof data.website === "string") {
      data.website = data.website.split(",").map(w => w.trim());
    }

    const newResume = await Resume.create({
      userId,
      ...data,
      slug: createSlug(
        data.title || "Untitled",
        new mongoose.Types.ObjectId().toString()
      )
    });

    res.status(201).json({
      success: true,
      resumeId: newResume._id
    });

  } catch (err) {
    console.error("CREATE UPLOADED RESUME ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};




export const updateResume = async (req, res) => {

  try {
    const userId = req.userId;

    // take resumeId out, rest is the update payload

    const { resumeId,...resumeDataCopy } = req.body;




    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: resumeDataCopy },
      { new: true }
    );
    
    if (!updatedResume) {
      return res.status(403).json({
        success: false,
        message: "Resume not found or access denied",
      });
    }


    return res.json({
      success: true,
      resume: updatedResume,
    });
  } catch (error) {
    console.error("UPDATE RESUME ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};


export const updateImage = async (req,res)=>{ //returns url of new image


  try {

  const image = req.file;

   const { resumeId } = req.body; // ✅ ADD THIS

  if(!image){


     return res.status(400).json({ message: "No image uploaded" });

  }

  //create a url of the image and return it

  let uploadResponse = null;  //response from imageKit



      const stream = fs.createReadStream(image.path);

      uploadResponse = await imagekit.files.upload({
        file: stream,
        fileName: `resume-${resumeId}.png`,
        folder: "user-resumes",
        isPrivateFile:false,
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75"
        },
      });

      // cleanup temp file created by multer
      fs.unlinkSync(image.path);

      res.status(200).json({url:uploadResponse.url})


    


    } 
    catch (error) {
    

      console.log(error.message)

      return res.status(400).json({ message: error.message});


      }





}




export const changeTitle =  async (req, res) => {
    try {

    
      const { resumeId, title } = req.body;
      
      const userId = req.userId;

      const updated = await Resume.findOneAndUpdate(
        { _id: resumeId, userId },
        { title },
        { new: true }
      );

      if (!updated) {
        return res.status(403).json({message:"Resume Not Found", success: false });
      }

      res.status(200).json({ success: true,updatedResume: updated,message:"Title Changed" });
    } catch (err) {
      res.status(500).json({ success: false, message:err.message });
    }


  }


export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;


    const resume = await Resume.findOne({
      _id: resumeId,
      userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.json({
      success: true,
      resume,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getResumebySlug = async(req,res)=>{

    try {

      const {resumeSlug} = req.params

      const userId = req.userId



      
        const resume = await Resume.findOne({  //find by slug, if the owner is looking at it, show regardless or public or private,
                                                //else only show, when it is public
        slug:resumeSlug,
      });

      if (!resume || (userId != resume.userId.toString() && !resume.public) ) {    //no resume found then definitely success: false

 

        return res.status(403).json({
          success: false,
          message: "Resume not found or not Public",
        });

      }

        return res.json({
        success: true,
        resume
      });


    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }


}


export const getAllResumeById = async (req, res) => {
  try {
    const userId = req.userId;

 

    const resumes = await Resume.find({
      userId,
    });



    if (!resumes) {
      return res.status(404).json({
        success: false,
        message: "Resumes not found",
      });
    }

    return res.json({
      success: true,
      resumes,
    });

  } catch (error) {

 


    return res.status(500).json({

      success: false,
      message: error.message,
    });
  }
};






export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const deleted = await Resume.findOneAndDelete({
      _id: resumeId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or access denied",
      });
    }

    return res.json({
      success: true,
      message: "Resume deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
