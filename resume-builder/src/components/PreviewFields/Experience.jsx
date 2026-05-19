import DateFormatter from "../DateFormatter";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Experience = ({
  formData,
  setResumeStep,
  setDraftExperience,
  setEditingIndex,
  setDeletionIndex
}) => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

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
    <section className="mb-5 break-words">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB] shrink-0">
          Experience
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {experiences.map((job, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[14px] font-semibold text-gray-900">{job.role}</span>
              {!isViewMode && (
                <>
                  <button
                    onClick={() => {
                      setDraftExperience(job);
                      setResumeStep(5);
                      setEditingIndex(i);
                      setDeletionIndex(null);
                      setSearchParams((params) => {
                        const p = new URLSearchParams(params);
                        p.set("resumeStep", 5);
                        return p;
                      });
                      scrollToTop();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  {formData.experience?.length > 0 && (
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
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </>
              )}
              {job.type && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-gray-500 border border-blue-100">
                  {job.type}
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-500 whitespace-nowrap shrink-0">
              <DateFormatter value={job.startDate} />
              {" – "}
              {job.currentlyWorking ? "Present" : <DateFormatter value={job.endDate} />}
            </span>
          </div>

          {job.company && (
            <div className="text-[12px] text-gray-600 mt-0.5">{job.company}</div>
          )}

          {job.details && (
            <p className="text-[12px] leading-[1.65] text-gray-700 mt-1">{job.details}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default Experience;
