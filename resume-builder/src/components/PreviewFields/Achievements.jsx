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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const achievements = formData.achievements?.length
    ? formData.achievements
    : [
        {
          title: "Winner – Intercollegiate Hackathon",
          issuer: "TechFest 2023",
          description:
            "Built an AI scheduling tool selected as 1st place among 200+ teams."
        }
      ];

  return (
    <section className="mb-4 break-words">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        AWARDS & ACHIEVEMENTS
      </h2>

      {achievements.map((item, i) => (
        <div key={i} className="mb-3 pl-3">
        
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-md font-medium text-gray-900">
                {item.title}
              </span>

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
                    className="text-red-400 hover:text-red-500"
                  >
                    <Pencil className="size-4 hover:scale-105" />
                  </button>

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
                    className={`${formData.achievements?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
                  >
                    <Trash2 className="size-4 hover:scale-105" />
                  </button>
                </>
              )}
            </div>
          </div>

  
          {item.issuer && (
            <div className="text-sm italic text-gray-600">
              {item.issuer}
            </div>
          )}


          {item.description && (
            <p className="text-sm text-gray-700 mt-1 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default Achievements;
