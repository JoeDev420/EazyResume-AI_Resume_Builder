import React from "react";
import { Pencil } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Skills = ({ formData, setResumeStep }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // ✅ SAME LOGIC AS OTHER SECTIONS
  const isViewMode = location.pathname.startsWith("/view");

  const skills = formData.skills?.length
    ? formData.skills
    : [];

  return (
    <section className="mb-4">
      <div className="flex gap-2 items-center">
        <h2 className="text-sm font-semibold tracking-wide mb-1">
          SKILLS
        </h2>

        {/* EDIT – hidden in view mode */}
        {!isViewMode && (
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
            className={`${formData.skills?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
            aria-label="Edit Skills"
          >
            <Pencil className="size-4 hover:scale-105" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pl-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-100 text-white-600 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
