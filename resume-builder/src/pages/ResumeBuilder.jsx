import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../components/AxiosConfig";
import { useAuth } from "../components/AuthContext.jsx";


import PersonalInfoForm from "../components/forms/PersonalInfoForm.jsx";
import TemplateRenderer from "../components/templates/TemplateRender.jsx";
import TemplateDropdown from "../components/TemplateDropdown.jsx";
import ProfessionalSummaryForm from "../components/forms/ProfessionalSummaryForm.jsx";
import ExperienceForm from "../components/forms/ExperienceForm.jsx";
import EducationForm from "../components/forms/EducationForm.jsx";
import ProjectsForm from "../components/forms/ProjectsForm.jsx";
import SkillsForm from "../components/forms/SkillsForm.jsx";
import AchievementsForm from "../components/forms/AchievementsForm.jsx";
import SectionToggles from "../components/SectionToggle.jsx";
import ResumeNavigator from "../components/ResumeNavigator.jsx";
import { toast } from "react-toastify";
import AtsScan from "./AtsScan.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";






const ResumeBuilder = () => {


  const [searchParams,setSearchParams] = useSearchParams()

  const navigate = useNavigate();

  const {resumeId} = useParams();

  const [resumeStep, setResumeStep] = useState(Number(searchParams.get("resumeStep")) || 1);

  const [showTemplateMenu,setShowTemplateMenu] = useState(false);

  const [templateId,setTemplateId] = useState(1)

  const [previewLoading,setPreviewLoading] = useState(true)

  const [publishLoading,setpublishLoading] = useState(false)

  const [imageLoading,setImageLoading] = useState(false)

  const [formData, setFormData] = useState({

    title:"",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    linkedinShort:"",
    website: [],
    websiteShort:[],
    experience: [],
    profileImageObject: {profileImageUrl:"",
    },
    sectionOrder:[
    "summary",
    "education",
    "skills",
    "experience",
    "projects",
    "achievements",
  ],
    professionalsummary: "",
    profession: "",
    achievements:[],
    skills:[],
    projects: [],
    education:[],
    change:false

  });

  const[editingIndex,setEditingIndex,] = useState(null)

  const [deletionIndex,setDeletionIndex] = useState(null)
  
  const [draftEducation, setDraftEducation] = useState({
    institute: "",
    degree: "",
    field: "",
    graduationDate: "",
    cgpa: "",
  });

  const [draftExperience, setDraftExperience] = useState({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      type:"",
      details: "",
    });

  const [draftProject, setDraftProject] = useState({
      title: "",
      type: "",
      description: "",
    });


   
  const [draftAchievement, setDraftAchievement] = useState({
      title: "",
      issuer: "",
      description: "",
    });

  




  useEffect(
    
    ()=>{     //load resume data based on resumeId and set Template

        const getResumeData = async ()=>{

          try {
            

          const response = await API.get(`/resume/resumeData/${resumeId}`)  

          const resumeData = response.data.resume

          setFormData({...resumeData,change:false})

          setTemplateId(response.data.resume.templateId)

          setPreviewLoading(false)


          } catch (error) {

            console.log(error)

            setPreviewLoading(false)
            
          }

        }


        getResumeData()


    },[resumeId])



  const savetoPreview = async()=>{

    try {
      
        //make resume public


        const publicForm = {...formData,
                            public:true
        }


        setpublishLoading(true)

        const response = await API.put("/resume/updateAll",{resumeId,...publicForm}) //to make it public 
                                                              //if any error All validation middleware would return error

        setpublishLoading(false)
          
        navigate(`/view/${response.data.resume.slug}`);
        
  
      } 
      
      catch (error) {

        toast.error(error.response.data.message)

        setpublishLoading(false)
      
      }
    

  }

  const goToEnd = () => {
  setResumeStep(9);
  setSearchParams((params) => {
    const p = new URLSearchParams(params);
    p.set("resumeStep", 9);
    return p;
  });
};



  return (

    <div className="grid grid-cols-[3fr_4fr_1fr] bg-gray-100 min-h-screen gap-8">

      <div className="flex flex-col bg-white ml-10 mt-5">



        <div className="bg-white px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/app")}
            className="text-blue-500"
          >
            Back to Dashboard
          </button>


          <TemplateDropdown
          templateId={templateId}
          onChange={{
            open: showTemplateMenu,
            toggle: () => setShowTemplateMenu((prev) => !prev),
            select: async(id) => {

              try {
                
              
              setTemplateId(id);    

              setShowTemplateMenu(false);
              //when new template is selected, save it to the resume's data


              const response = await API.put("/resume/update",{resumeStep,templateId:id,resumeId})

              } catch (error) {

                console.log(error.message)
                
              }

            },
          }}
        />
        </div>


        <div className="px-8 py-2">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {resumeStep} of 9</span>
            <span>{Math.round((resumeStep / 9) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(resumeStep / 9) * 100}%` }}
            />
          </div>
          </div>





        {resumeStep === 1 &&<div className="px-8 relative">
          
            <PersonalInfoForm
              formData={formData}
              setFormData={setFormData}
              setResumeStep = {setResumeStep}
              resumeStep={resumeStep}
              setPreviewLoading={setPreviewLoading}
              imageLoading = {imageLoading}
              setImageLoading = {setImageLoading}
            />
          
        </div>}


        {resumeStep === 2 &&<div className="px-8">
          
            
          <ProfessionalSummaryForm 
          formData={formData}
          setFormData={setFormData}
          setResumeStep = {setResumeStep}
          resumeStep={resumeStep}
          setPreviewLoading={setPreviewLoading}
                                  
          />

        </div>}


        {resumeStep === 3 &&<div className="px-8">
          
            
          <EducationForm
          formData={formData}
          setFormData={setFormData}
          setResumeStep = {setResumeStep}
          resumeStep={resumeStep}
          setPreviewLoading={setPreviewLoading}
          draftEducation={draftEducation}
          setDraftEducation={setDraftEducation}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          deletionIndex={deletionIndex}
          setDeletionIndex={setDeletionIndex}
                                  
          />


        </div>}

        {resumeStep === 4 &&<div className="px-8 py-6">
          
            
          <SkillsForm
          formData={formData}
          setFormData={setFormData}
          setResumeStep = {setResumeStep}
          resumeStep={resumeStep}
          setPreviewLoading={setPreviewLoading}  
       
          />

        </div>}

        {resumeStep === 5 &&<div className="px-8 py-6">
          
            
          <ExperienceForm
          formData={formData}
          setFormData={setFormData}      
          setResumeStep = {setResumeStep}
          resumeStep={resumeStep}
          setPreviewLoading={setPreviewLoading}
          draftExperience={draftExperience}
          setDraftExperience={setDraftExperience}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          deletionIndex={deletionIndex}
          setDeletionIndex={setDeletionIndex}
          />

        </div>}


        {resumeStep === 6 &&<div className="px-8 py-6">
          
            
          <ProjectsForm
          formData={formData}
          setFormData={setFormData}    
          setResumeStep = {setResumeStep}
          resumeStep={resumeStep} 
          setPreviewLoading={setPreviewLoading} 
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          draftProject={draftProject}
          setDraftProject={setDraftProject}
          deletionIndex={deletionIndex}
          setDeletionIndex={setDeletionIndex}
          />

     
        </div>}

        {resumeStep === 7 &&<div className="px-8 py-6">
          
            
          <AchievementsForm
          formData={formData}
          setFormData={setFormData}
          setResumeStep = {setResumeStep}
          resumeStep={resumeStep}
          setPreviewLoading={setPreviewLoading}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          draftAchievement={draftAchievement}
          setDraftAchievement = {setDraftAchievement}
          deletionIndex={deletionIndex}
          setDeletionIndex={setDeletionIndex}      
          />

        </div>
        }



        {resumeStep === 8 &&<div className="px-8 py-6">


          <ResumeNavigator     resumeStep={resumeStep}
                               setResumeStep={setResumeStep}
                               formData={formData}
                               setFormData={setFormData}
                               setPreviewLoading={setPreviewLoading} 
          />
          
            
          <AtsScan 
          formData={formData} 
          />

        </div>
        }

          {resumeStep === 9 && (
            <div className="px-8 py-6 flex flex-col gap-4">

              <ResumeNavigator resumeStep={resumeStep}
                               setResumeStep={setResumeStep}
                               formData={formData}
                               setFormData={setFormData}
                               setPreviewLoading={setPreviewLoading}
              />
      
              <p className="text-sm text-gray-600">
                Publishing your resume will make it publicly accessible on a preview page.
                Anyone with the link will be able to view and download it.
              </p>

              <button
                onClick={savetoPreview}
                className=" relative h-10 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded transition-colors w-40 mx-auto mt-5"
              >
                {publishLoading?<LoadingSpinner />:"Publish"}

              </button>
            </div>
          )}


          <button
            type="button"
            onClick={goToEnd}
            className="absolute right-0 mt-6 w-full h-10 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
          >
            Go to End
          </button>



        

      </div>


    <div className="Preview">


      <div className="px-4 flex justify-center items-start">
        <TemplateRenderer
          previewLoading={previewLoading}
          templateId={templateId}
          formData={formData}
          setFormData={setFormData}
          imageLoading = {imageLoading}
          setDraftEducation={setDraftEducation}
          resumeStep = {resumeStep}
          setResumeStep={setResumeStep}
          setEditingIndex={setEditingIndex}
          setDraftExperience={setDraftExperience}
          setDraftProject={setDraftProject}
          setDraftAchievement = {setDraftAchievement} 
          setDeletionIndex={setDeletionIndex}  
          sectionVisibility={formData.sectionVisibility || {profilePic:true,
                  summary: true,
                  skills: true,
                  experience: true,
                  projects: true,
                  education: true,
                  achievements: true,}}
        
        />
      </div>

    </div>

      {formData.sectionVisibility&& <div className="px-4 py-4 bg-white border-l border-t  mt-5">
        
        <SectionToggles     //can change section visibility. Visibility is used directly by the templates so that changes
                            //how they render things
          sectionVisibility={formData.sectionVisibility}
          setFormData = {setFormData}
          resumeId = {resumeId}
          resumeStep = {resumeStep}

        />

      </div>}


    </div>


    

  );

};

export default ResumeBuilder;
