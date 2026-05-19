import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Projects = ({
  formData,
  setDraftProject,
  setEditingIndex,
  setResumeStep,
  setDeletionIndex
}) => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const projects = formData.projects?.length
    ? formData.projects
    : [
        {
          title: "Resume Builder App",
          type: "Web Application",
          description: "Built a resume builder with live preview and multi-template support.",
          liveLink: ""
        }
      ];

  return (
    <section className="mb-5 break-words">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB] shrink-0">
          Projects
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {projects.map((project, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[14px] font-semibold text-gray-900">{project.title}</span>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-[11px] text-[#2563EB] hover:underline"
              >
                <ExternalLink size={11} />
                Live
              </a>
            )}
            {!isViewMode && (
              <>
                <button
                  onClick={() => {
                    setDraftProject(project);
                    setResumeStep(6);
                    setDeletionIndex(null);
                    setEditingIndex(i);
                    setSearchParams((params) => {
                      const p = new URLSearchParams(params);
                      p.set("resumeStep", 6);
                      return p;
                    });
                    scrollToTop();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="size-3.5" />
                </button>
                {formData.projects?.length > 0 && (
                  <button
                    onClick={() => {
                      setDraftProject(project);
                      setResumeStep(6);
                      setDeletionIndex(i);
                      setEditingIndex(null);
                      setSearchParams((params) => {
                        const p = new URLSearchParams(params);
                        p.set("resumeStep", 6);
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

          {project.type && (
            <div className="text-[11px] text-gray-500 mt-0.5">{project.type}</div>
          )}

          {project.description && (
            <p className="text-[12px] leading-[1.65] text-gray-600 mt-1">{project.description}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default Projects;
