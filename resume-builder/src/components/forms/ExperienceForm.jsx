import { Sparkles, Trash2 } from "lucide-react";
import ResumeNavigator from "../ResumeNavigator";
import LoadingSpinner from "../LoadingSpinner";
import { enhanceAi, buildRedirectUri } from "../../utils/aiUtils.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop.js";


const ExperienceForm = ({
  formData,
  setFormData,
  setResumeStep,
  resumeStep,
  setPreviewLoading,

  draftExperience,
  setDraftExperience,
  editingIndex,
  setEditingIndex,
  deletionIndex,
  setDeletionIndex
}) => {
  const { experience } = formData;
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const { user } = useAuth();
  const redirectUri = buildRedirectUri(resumeId, resumeStep);

  const miniForm = { experience };

  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDraftExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetDraft = () => {
    setDraftExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      details: "",
      type: "",
    });
    setEditingIndex(null);
    setDeletionIndex(null);
  };

  const resetForm = () => resetDraft();

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, draftExperience],
      change: true
    }));
    resetDraft();
  };

  const updateExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, idx) =>
        idx === editingIndex ? draftExperience : exp
      ),
      change: true
    }));
    resetDraft();
  };

  const deleteExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== deletionIndex),
      change: true
    }));
    resetDraft();
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

      <form className="form-animate flex flex-col gap-6 bg-white p-6 w-full min-w-md max-w-5xl px-2 mx-auto">

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Experience</p>
          <button
            type="button"
            onClick={resetForm}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex justify-end gap-2 flex-wrap">
          <button
            type="button"
            onClick={addExperience}
            className="bg-blue-500 text-white px-3 py-1.5 rounded"
          >
            Add Experience
          </button>

          {(editingIndex != null || deletionIndex != null) && (
            <button
              type="button"
              onClick={editingIndex != null ? updateExperience : deleteExperience}
              className={`${editingIndex != null ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1.5 rounded`}
            >
              {editingIndex != null ? "Update Experience" : "Delete Experience"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={draftExperience.company}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={draftExperience.role}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label>Start Date</label>
            <input
              type="month"
              name="startDate"
              value={draftExperience.startDate}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>End Date</label>
            <input
              type="month"
              name="endDate"
              value={draftExperience.endDate}
              onChange={handleChange}
              disabled={draftExperience.currentlyWorking}
              className="border border-gray-300 p-2.5 w-full rounded-md disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label>Type of Experience</label>
          <select
            name="type"
            value={draftExperience.type}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 w-full rounded-md bg-white"
          >
            <option value="">Select type</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="freelancing">Freelancing</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="currentlyWorking"
            checked={draftExperience.currentlyWorking}
            onChange={handleChange}
          />
          <label>Currently working here</label>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label>Job Description</label>
            <button
              type="button"
              className="w-31 h-10 relative flex items-center gap-2 text-purple-600 border border-purple-200 px-3 py-1.5 rounded-full hover:bg-purple-50 transition"
              onClick={
                user.premium
                  ? () => enhanceAi(draftExperience.details, "details", setDraftExperience, null, setAiLoading)
                  : () => navigate(redirectUri)
              }
            >
              {aiLoading ? <LoadingSpinner color="black" /> : <>
                <Sparkles size={16} />
                <span>AI Enhance</span>
              </>}
            </button>
          </div>
          <textarea
            name="details"
            value={draftExperience.details}
            onChange={handleChange}
            rows={5}
            className="border border-gray-300 p-2.5 w-full rounded-md resize-none wrap-break-word"
          />
        </div>

      </form>
    </>
  );
};

export default ExperienceForm;
