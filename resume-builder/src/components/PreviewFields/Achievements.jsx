import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Achievements = ({
  formData,
  setEditingIndex,
  setResumeStep,
  setDraftAchievement,
  setDeletionIndex
}) => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const achievements = formData.achievements?.length
    ? formData.achievements
    : [
        {
          title: "Winner – Intercollegiate Hackathon",
          issuer: "TechFest 2023",
          description: "Built an AI scheduling tool selected as 1st place among 200+ teams."
        }
      ];

  return (
    <section className="mb-5 break-words">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB] shrink-0">
          Awards & Achievements
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {achievements.map((item, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[14px] font-semibold text-gray-900">{item.title}</span>
            {!isViewMode && (
              <>
                <button
                  onClick={() => {
                    setDraftAchievement(item);
                    setEditingIndex(i);
                    setDeletionIndex(null);
                    setResumeStep(7);
                    setSearchParams((params) => {
                      const p = new URLSearchParams(params);
                      p.set("resumeStep", 7);
                      return p;
                    });
                    scrollToTop();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="size-3.5" />
                </button>
                {formData.achievements?.length > 0 && (
                  <button
                    onClick={() => {
                      setDraftAchievement(item);
                      setResumeStep(7);
                      setDeletionIndex(i);
                      setEditingIndex(null);
                      setSearchParams((params) => {
                        const p = new URLSearchParams(params);
                        p.set("resumeStep", 7);
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

          {item.issuer && (
            <div className="text-[12px] text-gray-600 mt-0.5">{item.issuer}</div>
          )}

          {item.description && (
            <p className="text-[12px] leading-[1.65] text-gray-700 mt-1">{item.description}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default Achievements;
