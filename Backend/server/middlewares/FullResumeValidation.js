import { FullResumeSchema } from "./FullResumeSchema.js";

export const FullResumeValidation = (req,res,next)=>{
      //verify the whole resume for any errors



     const { error, value } =  FullResumeSchema.validate(req.body)

      if (error) {
  
        return res.status(400).json({
          message: error.details[0].message
        });
      }

      // overwrite body with validated data
      req.body = value;
      next();

      return

}