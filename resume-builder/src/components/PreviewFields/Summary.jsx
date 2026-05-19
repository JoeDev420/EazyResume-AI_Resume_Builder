import { Pencil } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Summary = ({ formData, setResumeStep }) => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const { professionalsummary } = formData;

  return (
    <section className="mb-5 break-words">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB] shrink-0">
          Summary
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
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
            className="text-gray-400 hover:text-gray-600"
          >
            <Pencil className="size-3.5" />
          </button>
        )}
      </div>

      <p className={`text-[12px] leading-[1.65] ${professionalsummary ? "text-gray-600" : "text-gray-400"}`}>
        {professionalsummary || "Briefly describe your experience, strengths, and career goals here."}
      </p>
    </section>
  );
};

export default Summary;
