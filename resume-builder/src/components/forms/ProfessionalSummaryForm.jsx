import {useState } from "react";
import { Trash2, Sparkles } from "lucide-react";
import ResumeNavigator from "../ResumeNavigator";
import LoadingSpinner from "../LoadingSpinner";
import {useNavigate} from "react-router-dom";
import { buildRedirectUri,enhanceAi } from "../../utils/aiUtils.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { scrollToTop } from "../../utils/scrollToTop.js";

const ProfessionalSummaryForm = ({
  formData,
  setFormData,
  resumeStep,
  setResumeStep,
  setPreviewLoading,
}) => {

  const { professionalsummary } = formData;

  const {resumeId} = useParams()

  const {user} = useAuth()


  const redirectUri = buildRedirectUri(resumeId,resumeStep)

    
  const navigate = useNavigate()


  const [aiLoading,setAiLoading] = useState(false)


  


  const miniForm = {
    professionalsummary,
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      change:true
    }));
  };


  const resetForm = () => {
    setFormData((prev) => ({
      ...prev,
      professionalsummary: "",
    }));
  };






  return (
    <>
      <ResumeNavigator
        miniForm={miniForm}
        setResumeStep={setResumeStep}
        resumeStep={resumeStep}
        setPreviewLoading={setPreviewLoading}
        formData={formData}
        setFormData={setFormData}
      />

      <form className="form-animate flex flex-col gap-5 bg-white max-h-150">
        <div className="flex justify-between items-center py-5">
          <div>
            <p className="text-xl font-semibold">Professional Summary</p>
            <p className="text-sm text-gray-500">
              Add a short summary highlighting your strengths and experience
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div>
          <button
            type="button"
            className="w-31 h-10 relative flex items-center gap-2 text-purple-600 border border-purple-200 px-4 rounded-full text-sm hover:bg-purple-50 transition"
            onClick={user.premium?()=>{
              
              const data = professionalsummary
              
              enhanceAi(data,"professionalsummary",null,setFormData,setAiLoading)}: ()=>{navigate(redirectUri)}}
          >
            {aiLoading?<LoadingSpinner color={"black"}/>:<div className="flex items-center justify-center">
                                                            <Sparkles size={16} />
                                                            <span>AI Enhance</span>
                                                         </div>}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label>Summary</label>
          <textarea
            name="professionalsummary"
            value={professionalsummary}
            onChange={handleChange}
            placeholder="Write a compelling professional summary (3–4 sentences)..."
            rows={6}
            className="border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 wrap-break-word"
          />
        </div>

        <p className="text-xs text-gray-500">
          Tip: Keep it concise and focus on measurable impact and skills.
        </p>
      </form>
    </>
  );
};

export default ProfessionalSummaryForm;
