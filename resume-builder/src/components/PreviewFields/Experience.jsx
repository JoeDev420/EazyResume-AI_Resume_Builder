import React from "react";
import DateFormatter from "../DateFormatter";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom"; // Add useLocation
import { scrollToTop } from "../../utils/scrollToTop";

const Experience = ({
  formData,
  setResumeStep,
  setDraftExperience,
  setEditingIndex,
  setDeletionIndex
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // Add this
  const isViewMode = location.pathname.startsWith("/view"); // Add this

  const experiences = formData.experience?.length
    ? formData.experience
    : [
        {
          role: "Job Title",
          company: "Company Name",
          startDate: "2022-01",
          endDate: "",
          currentlyWorking: true,
          details: "Describe your responsibilities and key achievements."
        }
      ];

  return (
    <section className="mb-4 wrap-break-word">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        EXPERIENCE
      </h2>

      {experiences.map((job, i) => (
        <div key={i} className="mb-3 pl-3">
          {/* TITLE ROW */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="text-md font-medium text-gray-900">
                {job.role}
              </span>

              {job.type && (
                <span className="text-xs px-2 py-[2px] rounded bg-gray-200 text-gray-700">
                  {job.type}
                </span>
              )}

              {/* EDIT - Hide in view mode */}
              {!isViewMode && ( // Add this condition
                <button
                  onClick={() => {
                    setDraftExperience(job);
                    setResumeStep(5);
                    setDeletionIndex(null);
                    setEditingIndex(i);

                    setSearchParams((params) => {
                      const p = new URLSearchParams(params);
                      p.set("resumeStep", 5);
                      return p;
                    });

                    scrollToTop();
                  }}
                  className={`${formData.experience?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
                  aria-label="Edit Experience"
                >
                  <Pencil className="size-4 hover:scale-105" />
                </button>
              )}

              {/* DELETE - Hide in view mode */}
              {!isViewMode && ( // Add this condition
                <button
                  onClick={() => {
                    setDraftExperience(job);
                    setResumeStep(5);
                    setDeletionIndex(i);
                    setEditingIndex(null);

                    setSearchParams((params) => {
                      const p = new URLSearchParams(params);
                      p.set("resumeStep", 5);
                      return p;
                    });

                    scrollToTop();
                  }}
                  className={`${formData.experience?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
                  aria-label="Delete Experience"
                >
                  <Trash2 className="size-4 hover:scale-105" />
                </button>
              )}
            </div>

            {/* DATES */}
            <span className="text-sm text-gray-500 whitespace-nowrap">
              <DateFormatter value={job.startDate} />
              {" – "}
              {job.currentlyWorking ? "Present" : <DateFormatter value={job.endDate} />}
            </span>
          </div>

          {/* COMPANY */}
          <div className="text-sm italic text-gray-600">
            {job.company}
          </div>

          {/* DETAILS */}
          <p className="text-sm mt-1 text-gray-700 leading-relaxed">
            {job.details}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Experience;