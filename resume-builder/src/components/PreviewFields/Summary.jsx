import React from "react";
import { Pencil } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Summary = ({ formData, setResumeStep }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const { professionalsummary } = formData;

  return (
    <section className="mb-4 relative break-words px-1">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-wide">
          PROFESSIONAL SUMMARY
        </h2>

        {!isViewMode && professionalsummary?.length > 0 && (
          <button
            onClick={() => {
              setSearchParams((params) => {
                const p = new URLSearchParams(params);
                p.set("resumeStep", 2);
                return p;
              });
              setResumeStep(2);
              scrollToTop();
            }}
            className="text-red-400 hover:text-red-500"
          >
            <Pencil className="size-4 hover:scale-105" />
          </button>
        )}
      </div>

      <p
        className={`text-sm leading-relaxed pl-3 mt-1 ${
          professionalsummary
            ? "text-gray-800"
            : "italic text-gray-400"
        }`}
      >
        {professionalsummary ||
          "Briefly describe your experience, strengths, and career goals here."}
      </p>
    </section>
  );
};

export default Summary;
