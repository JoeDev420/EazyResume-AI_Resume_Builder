import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
import ResumeNavigator from "../ResumeNavigator";
import { scrollToTop } from "../../utils/scrollToTop.js";

const SkillsForm = ({
  formData,
  setFormData,
  setResumeStep,
  resumeStep,
  setPreviewLoading
}) => {
  const { skills } = formData;


  const miniForm = {
    skills,
  };

  const [draftSkill, setDraftSkill] = useState("");


  const resetForm = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [],
    }));
  };


  const addSkill = () => {
    if (!draftSkill.trim()) return;

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, draftSkill.trim()],
      change:true
    }));

    setDraftSkill("");
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
      change:true
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

      <form className="form-animate flex flex-col gap-5 bg-white p-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Skills</p>

          <button
            type="button"
            onClick={resetForm}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
            value={draftSkill}
            onChange={(e) => setDraftSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 border border-gray-300 p-2"
          />

          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="hover:text-blue-900"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </form>
    </>
  );
};

export default SkillsForm;
