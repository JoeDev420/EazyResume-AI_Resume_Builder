import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop.js";

const Achievements = ({
  formData,
  setEditingIndex,
  setResumeStep,
  setDraftAchievement,
  setDeletionIndex
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <section className="mb-4 wrap-break-word">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        AWARDS & ACHIEVEMENTS
      </h2>

      {achievements.map((item, i) => (
        <div key={i} className="mb-3 pl-3 flex flex-col">
          {/* TITLE ROW */}
          <div className="flex items-center gap-2">
            <span className="text-md font-medium text-gray-900">
              {item.title}
            </span>

            {/* EDIT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
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
              className={`${formData.achievements?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
              aria-label="Edit Achievement"
            >
              <Pencil className="size-4 hover:scale-105" />
            </button>

            {/* DELETE */}
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
              aria-label="Delete Achievement"
            >
              <Trash2 className="size-4 hover:scale-105" />
            </button>
          </div>

          {/* ISSUER */}
          {item.issuer && (
            <div className="text-sm italic text-gray-600">
              {item.issuer}
            </div>
          )}

          {/* DESCRIPTION */}
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
