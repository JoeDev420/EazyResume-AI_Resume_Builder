import React from "react";
import DateFormatter from "../DateFormatter";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Education = ({
  formData,
  setDraftEducation,
  setResumeStep,
  setEditingIndex,
  setDeletionIndex
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const education = formData.education?.length
    ? formData.education
    : [
        {
          degree: "Degree Name",
          field: "Field of Study",
          institute: "Institution Name",
          graduationDate: "2023-03",
          cgpa: ""
        }
      ];

  return (
    <section className="mb-4 break-words">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        EDUCATION
      </h2>

      {education.map((edu, i) => (
        <div key={i} className="mb-3 pl-3">
          {/* DEGREE + ACTIONS */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-md font-medium text-gray-900">
                {edu.degree}
                {edu.field && ` — ${edu.field}`}
              </span>

              {!isViewMode && (
                <>
                  <button
                    onClick={() => {
                      setDraftEducation(edu);
                      setResumeStep(3);
                      setEditingIndex(i);
                      setDeletionIndex(null);

                      setSearchParams((params) => {
                        const p = new URLSearchParams(params);
                        p.set("resumeStep", 3);
                        return p;
                      });

                      scrollToTop();
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Pencil className="size-4 hover:scale-105" />
                  </button>

                  <button
                    onClick={() => {
                      setDraftEducation(edu);
                      setResumeStep(3);
                      setDeletionIndex(i);
                      setEditingIndex(null);

                      setSearchParams((params) => {
                        const p = new URLSearchParams(params);
                        p.set("resumeStep", 3);
                        return p;
                      });

                      scrollToTop();
                    }}
                    className={`${formData.education?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
                  >
                    <Trash2 className="size-4 hover:scale-105" />
                  </button>
                </>
              )}
            </div>

            {/* DATE */}
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              <DateFormatter value={edu.graduationDate} />
            </span>
          </div>

          {/* INSTITUTE */}
          {edu.institute && (
            <div className="text-sm italic text-gray-600">
              {edu.institute}
            </div>
          )}

          {/* CGPA */}
          {edu.cgpa && (
            <div className="text-sm text-gray-600">
              CGPA: {edu.cgpa}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Education;
