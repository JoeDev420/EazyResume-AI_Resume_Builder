import React from "react";
import { Pencil } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Skills = ({ formData, setResumeStep }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const skills = formData.skills?.length ? formData.skills : [];

  return (
    <section className="mb-4 break-words">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-wide">
          SKILLS
        </h2>

        {/* EDIT – hidden in view mode */}
        {!isViewMode && skills.length > 0 && (
          <button
            onClick={() => {
              setResumeStep(4);
              setSearchParams((params) => {
                const p = new URLSearchParams(params);
                p.set("resumeStep", 4);
                return p;
              });
              scrollToTop();
            }}
            className="text-red-400 hover:text-red-500"
            aria-label="Edit Skills"
          >
            <Pencil className="size-4 hover:scale-105" />
          </button>
        )}
      </div>

      {/* SKILLS LIST */}
      <div className="flex flex-wrap gap-2 pl-3 mt-1">
        {skills.length > 0 ? (
          skills.map((skill, i) => (
            <span
              key={i}
              className="
                px-3 py-1 rounded-full
                text-xs sm:text-sm
                bg-blue-100 text-gray-800
                break-words
              "
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="italic text-sm text-gray-400">
            Add your skills here
          </span>
        )}
      </div>
    </section>
  );
};

export default Skills;
