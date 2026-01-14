import { Trash2 } from "lucide-react";
import ResumeNavigator from "../ResumeNavigator";
import { scrollToTop } from "../../utils/scrollToTop.js";

const EducationForm = ({
  formData,
  setFormData,
  setResumeStep,
  resumeStep,
  setPreviewLoading,

  draftEducation,
  setDraftEducation,
  editingIndex,
  setEditingIndex,
  deletionIndex,
  setDeletionIndex
}) => {
  const { education } = formData;

  const miniForm = { education };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDraftEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetDraft = () => {
    setDraftEducation({
      institute: "",
      degree: "",
      field: "",
      graduationDate: "",
      cgpa: "",
    });

    setEditingIndex(null);
    setDeletionIndex(null);
  };

  const resetForm = () => resetDraft();

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, draftEducation],
      change: true
    }));

    resetDraft();
  };

  const updateEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, index) =>
        index === editingIndex ? draftEducation : edu
      ),
      change: true
    }));

    resetDraft();
  };

  const deleteEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, index) =>
        index != deletionIndex
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

      <form className="form-animate flex flex-col gap-6 bg-white p-6 w-full min-w-md mx-auto">

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Education</p>

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
            onClick={addEducation}
            className="bg-blue-500 text-white px-3 py-1.5 rounded"
          >
            Add Education
          </button>

          {(editingIndex != null || deletionIndex != null) && (
            <button
              type="button"
              onClick={editingIndex != null ? updateEducation : deleteEducation}
              className={`${editingIndex != null ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1.5 rounded`}
            >
              {editingIndex != null ? "Update Education" : "Delete Education"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label>Institute</label>
            <input
              type="text"
              name="institute"
              value={draftEducation.institute}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              value={draftEducation.degree}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label>Field of Study</label>
            <input
              type="text"
              name="field"
              value={draftEducation.field}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Graduation Date</label>
            <input
              type="month"
              name="graduationDate"
              value={draftEducation.graduationDate}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 w-full rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label>CGPA</label>
          <input
            type="text"
            name="cgpa"
            value={draftEducation.cgpa}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 w-full rounded-md"
          />
        </div>

      </form>
    </>
  );
};

export default EducationForm;
