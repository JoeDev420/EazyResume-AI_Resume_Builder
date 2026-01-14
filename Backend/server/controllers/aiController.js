import openai from "../config/Gemini.js";
import User from "../models/User.js";
import extractTextFromFile from "../utils/extractText.cjs";





// --------------------------------------------------
// 1) Enhance Summary
// --------------------------------------------------
export const enhanceData = async (req, res) => {

  try {
    const { data } = req.body;

 

    const userId = req.userId



    const user = await User.findById(userId)

 



    if(!user.premium){



      return res.status(400).json({success:false,message:"Unauthorized"})

    }


    const response = await openai.chat.completions.create({

          model: process.env.OPENAI_MODEL,
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content: "You are given resume data of a user, and you are supposed to return it in a polished form while making sure its of the correct length. only return improved data, nothing else"
              
            
            },
            {
              role: "user",
              content: data,
            },
          ],

        });


    const improvedData = response.choices[0].message.content.trim();

  

    

    res.status(200).json({ improvedData});
  } catch (error) {


    res.status(400).json({ message: error.message });
  }

};


// --------------------------------------------------
// 3) Create Resume AI
// --------------------------------------------------
export const createResumeAI = async (req, res) => {

    try {

    const { text, meta } = await extractTextFromFile(req.file)

    if (!text || text.length < 50) {
      return res.status(400).json({
        message: "Unable to extract readable text from resume"
      });
    }



    const rawTitle = req.file.originalname;
    
    const title = rawTitle.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();

   

   

    const response = await openai.chat.completions.create({

          model: process.env.OPENAI_MODEL,
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content: `You are parsing a resume titled: "${title}"
              
              
        Convert resume text into VALID JSON using ONLY these keys:

        title, fullName, email, phone, location, linkedin, website(array of strings),
        profession, professionalsummary, skills(array of strings and only skill names included),
        experience[{role,startDate,endDate,company,details(string),type,currentlyWorking}],
        projects[{title,type,description}],
        education[{degree,field,graduationDate(in years only, for ex. for 2020 june return: 2020-06),institute,cgpa(include percentages too)}],
        achievements[{title,issuer,description}],
        profileImageObject{profileImageUrl},
        sectionOrder[
          "summary",
          "education",
          "skills",
          "experience",
          "projects",
          "achievements",
      ]

        Rules:
        - Return JSON only
        - Missing info → empty string/array
        - No extra fields
        -for any detailed description like project description include appropriate and margins in the text`.trim(),
            },
            {
              role: "user",
              content: text,
            },
          ],

        });

    


      const raw = response.choices[0].message.content;

      // remove ```json and ```
      const cleaned = raw.replace(/```json|```/g, "").trim();

      const aiFormData = JSON.parse(cleaned);

      return res.json({success:true,aiFormData:aiFormData})


        

  } 


  catch (error) {
    console.error("Resume extraction failed:", error.message);

  console.log("STATUS:", error.status);
  console.log("CODE:", error.code);
  console.log("MESSAGE:", error.message);


    res.status(500).json({
      success: false,
      message: "Failed to extract resume text"
    });
  }

};


export const atsScan = async (req, res) => {
          try {
            const { formData } = req.body;

            if (!formData) {
              return res.status(400).json({ errors: ["Resume data not provided"] });
            }

            // Convert resume object into readable text for ATS
            const resumeText = JSON.stringify(formData, null, 2);

            const prompt = `
                  You are an ATS resume scanner.

                  Analyze the following resume data and return ONLY an array of ATS problems.

                  Rules:
                  - Return only a JSON array of strings.
                  - No explanation text.
                  - No markdown.
                  - Each item must be a clear ATS issue.
                  - If no issues, return an empty array.

                  Resume Data:
                  ${resumeText}
                  `;

                const response = await openai.chat.completions.create({

                    model: process.env.OPENAI_MODEL,
                    temperature: 0.1,

                    messages: [
                      {
                        role: "system",
                        content: `
                  You are an ATS resume scanner.

                  Rules:
                  - Return ONLY a JSON array of strings.
                  - Each string must be one ATS issue.
                  - No explanation.
                  - No markdown.
                  - If no issues exist, return an empty array [].
                  `
                      },
                      {
                        role: "user",
                        content: JSON.stringify(formData, null, 2)
                      }
                    ]

                  });


    let raw = response.choices[0].message.content.trim();

    

    // SAFETY PARSE
    let parsedErrors = [];

    try {
      parsedErrors = JSON.parse(raw);
    } catch (e) {
      // fallback cleanup if AI returns messy format
      raw = raw.replace(/```json|```/g, "").trim();
      parsedErrors = JSON.parse(raw);
    }

    if (!Array.isArray(parsedErrors)) {
      parsedErrors = ["ATS scan failed to return valid result."];
    }


    parsedErrors = parsedErrors.map(e =>
    e.replace(/^[\s\u200B\uFEFF\u2060\-•○●▪▫◦]+/u, "").trim());


    return res.json({
      errors: parsedErrors
    });

  } catch (err) {
    console.error("ATS Scan Error:", err.message);
    return res.status(500).json({
      errors: ["ATS scanning service is temporarily unavailable."]
    });
  }


};

