import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";

export const templates = [
  {
    id: 1,
    name: "Modern Centered",
    component: TemplateOne
  },
  {
    id: 2,
    name: "Left Sidebar",
    component: TemplateTwo
  },

  { id: 3, 
    name: "Header Bar", 
    component: TemplateThree 
},
];

const TemplateRenderer = ({ templateId, formData,setFormData,sectionVisibility,previewLoading,imageLoading,setDraftEducation,setResumeStep,setDraftExperience,setEditingIndex,setDraftProject,setDraftAchievement,setDeletionIndex,resumeStep,setPreviewLoading}) => {

  const SelectedTemplate =
    templates.find(t => t.id === templateId)?.component
    || TemplateOne;

  return <SelectedTemplate formData={formData} setFormData={setFormData} sectionVisibility={sectionVisibility} previewLoading={previewLoading} imageLoading={imageLoading} setDraftEducation={setDraftEducation} resumeStep={resumeStep} setResumeStep={setResumeStep} 
          setDraftExperience={setDraftExperience} setEditingIndex={setEditingIndex} setDraftProject={setDraftProject} setDraftAchievement={setDraftAchievement}
          setDeletionIndex={setDeletionIndex} templateId={templateId} setPreviewLoading={setPreviewLoading}/>;
};

export default TemplateRenderer;
