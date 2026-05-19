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
  const [, setSearchParams] = useSearchParams();
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
    <section className="mb-5 break-words">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB] shrink-0">
          Education
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {education.map((edu, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[14px] font-semibold text-gray-900">
                {edu.degree}{edu.field && ` — ${edu.field}`}
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
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  {formData.education?.length > 0 && (
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
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </>
              )}
            </div>
            <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
              <DateFormatter value={edu.graduationDate} />
            </span>
          </div>

          {edu.institute && (
            <div className="text-[12px] text-gray-500 mt-0.5">{edu.institute}</div>
          )}

          {edu.cgpa && (
            <div className="text-[11px] text-gray-400 mt-0.5">GPA: {edu.cgpa}</div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Education;
