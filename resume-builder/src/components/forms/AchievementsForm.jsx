import { Trash2, Sparkles } from "lucide-react";
import ResumeNavigator from "../ResumeNavigator";
import { useAuth } from "../AuthContext";
import { buildRedirectUri, enhanceAi } from "../../utils/aiUtils";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { scrollToTop } from "../../utils/scrollToTop.js";

const AchievementsForm = ({
  formData,
  setFormData,
  setResumeStep,
  resumeStep,
  setPreviewLoading,

  draftAchievement,
  setDraftAchievement,
  editingIndex,
  setEditingIndex,
  deletionIndex,
  setDeletionIndex
}) => {

  const { achievements } = formData;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [aiLoading, setAiLoading] = useState(false);
  const { resumeId } = useParams();
  const redirectUri = buildRedirectUri(resumeId, resumeStep);



  const miniForm = { achievements };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftAchievement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetDraft = () => {
    setDraftAchievement({
      title: "",
      issuer: "",
      description: "",
    });
    setEditingIndex(null);
    setDeletionIndex(null);
  };

  const resetForm = () => {
    resetDraft();
  };

  const addAchievement = () => {
    if (!draftAchievement.title.trim()) return;
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, draftAchievement],
      change: true
    }));
    resetDraft();
  };

  const updateAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a, i) =>
        i === editingIndex ? draftAchievement : a
      ),
      change: true
    }));
    resetDraft();
  };

  const deleteAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) =>
        i !== deletionIndex
      ),
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

      <form className="form-animate flex flex-col gap-5 bg-white p-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Achievements</p>

          <button
            type="button"
            onClick={resetForm}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={addAchievement}
            className="bg-blue-500 text-white px-2 py-1.5 rounded"
          >
            Add Achievement
          </button>

          {(editingIndex !== null || deletionIndex !== null) && (
            <button
              type="button"
              onClick={editingIndex !== null ? updateAchievement : deleteAchievement}
              className={`${
                editingIndex !== null ? "bg-green-500" : "bg-red-500"
              } text-white px-2 py-1.5 rounded`}
            >
              {editingIndex !== null
                ? "Update Achievement"
                : "Delete Achievement"}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Achievement Title</label>
          <input
            type="text"
            name="title"
            value={draftAchievement.title}
            onChange={handleChange}
            className="border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Issuer</label>
          <input
            type="text"
            name="issuer"
            value={draftAchievement.issuer}
            onChange={handleChange}
            className="border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label>Achievement Description</label>

            <button
              type="button"
              className="w-31 h-10 relative flex items-center gap-2 text-purple-600 border border-purple-200 px-4 rounded-full text-sm hover:bg-purple-50 transition"
              onClick={
                user.premium
                  ? () => {
                      const data = draftAchievement.description;
                      enhanceAi(
                        data,
                        "description",
                        setDraftAchievement,
                        null,
                        setAiLoading
                      );
                    }
                  : () => navigate(redirectUri)
              }
            >
              {aiLoading ? (
                <LoadingSpinner color="black" />
              ) : (
                <div className="flex items-center gap-1">
                  <Sparkles size={16} />
                  <span>AI Enhance</span>
                </div>
              )}
            </button>
          </div>

          <textarea
            name="description"
            value={draftAchievement.description}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 p-3 resize-none wrap-break-word"
          />
        </div>
      </form>
    </>
  );
};

export default AchievementsForm;
