import React from "react";
import { Pencil } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Skills = ({ formData, setResumeStep, sidebar = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const skills = formData.skills?.length ? formData.skills : [];

  return (
    <section className="mb-4 break-words">
      <div className="flex items-center justify-between gap-2">
        <h2 className={`text-sm font-semibold tracking-widest uppercase ${sidebar ? "text-slate-300" : "text-gray-700"}`}>
          Skills
        </h2>
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
            className={sidebar ? "text-slate-400 hover:text-white" : "text-red-400 hover:text-red-500"}
            aria-label="Edit Skills"
          >
            <Pencil className="size-4 hover:scale-105" />
          </button>
        )}
      </div>

      {sidebar ? (
        <ul className="mt-2 space-y-1.5">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-200">
                <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                {skill}
              </li>
            ))
          ) : (
            <span className="italic text-xs text-slate-400">Add your skills</span>
          )}
        </ul>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-blue-50 text-gray-700 border border-blue-100">
                {skill}
              </span>
            ))
          ) : (
            <span className="italic text-sm text-gray-400">Add your skills here</span>
          )}
        </div>
      )}
    </section>
  );
};

export default Skills;
