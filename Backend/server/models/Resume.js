import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  
   {

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    title: {
        type: String,
        default: "Untitled Resume",
        required:true
    },

    public: {
        type: Boolean,
        default: false, 
    },

    templateId: {

        type: Number,
        default: 1,

    },

    sectionVisibility:{

        type: Object,
        default: {profilePic:true,
                  summary: true,
                  skills: true,
                  experience: true,
                  projects: true,
                  education: true,
                  achievements: true,}

    },

    sectionOrder:{

      type:Array,
      default: [

          "summary",
          "education",
          "skills",
          "experience",
          "projects",
          "achievements",

      ]

    },

        
            profileImageObject: {
            type: Object,
            default: {  
                profileImageUrl : "",
            },
            },



            fullName: {
            type: String,
            default: "",
            },
            profession: {
            type: String,
            default: "",
            },
            email: {
            type: String,
            default: "",
            },
            phone: {
            type: String,
            default: "",
            },
            location: {
            type: String,
            default: "",
            },
            linkedin: {
            type: String,
            default: "",
            },
            website: [{
            type: String,
          }],


           professionalsummary: {
              type: String,
              default: "",
          },

          skills: [
              {
              type: String,
              },
          ],


          experience: [
        {
          role: {
            type: String,
            default: "",
          },
          startDate: {
            type: String,
            default: "",
          },
          endDate: {
            type: String,
            default: "",
          },
          company: {
            type: String,
            default: "",
          },
          details: {
            type: String,
            default: "",
          },
          type:{            //internship,full time,part-time,freelancing
            type:String,
            default:""
          },
          currentlyWorking:{
            type:Boolean,
            default:false
          }
        },
          ],

          projects: [
          {
              title: {
              type: String,
              default: "",
              },
              type: {
              type: String,
              default: "",
              },
              description: {
              type: String,
              default: "",
              },
          },
          ],

          education: [
        {
          degree: {
            type: String,
            default: "",
          },
          field: {
            type: String,
            default: "",
          },
          graduationDate: {
            type: String,
            default: "",
          },
          institute: {
            type: String,
            default: "",
          },
          cgpa: {
            type: String,
            default: "",
          },
        },
          ],

          achievements: [
        {
          title: {
            type: String,
            default: "",
          },
          issuer: {
            type: String,
            default: "",
          },
          description: {
            type: String,
            default: "",
          },
        },
      ],

          slug: {

            type: String,
            unique: true,
            index: true,
            required: true
            

          },



          




    },{minimize:false}
  
  );


const Resume = mongoose.model("Resume",ResumeSchema)


export default Resume
