import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Projects = ({
  formData,
  setDraftProject,
  setEditingIndex,
  setResumeStep,
  setDeletionIndex
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const projects = formData.projects?.length
    ? formData.projects
    : [
        {
          title: "Resume Builder App",
          type: "Web Application, Data Analysis",
          description:
            "Built a resume builder with live preview and multi-template support.",
          liveLink: ""
        }
      ];

  return (
    <section className="mb-4 wrap-break-word">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        PROJECTS
      </h2>

      {projects.map((project, i) => (
        <div key={i} className="mb-3 pl-3">
          {/* TITLE ROW */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              {project.title}
            </span>

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 text-xs"
              >
                <ExternalLink size={12} />
                <span>Live</span>
              </a>
            )}

            {/* EDIT */}
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
              className={`${formData.projects?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
              aria-label="Edit Project"
            >
              <Pencil className="size-4 hover:scale-105" />
            </button>

            {/* DELETE */}
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
              className={`${formData.projects?.length ? "text-red-400 hover:text-red-500" : "hidden"}`}
              aria-label="Delete Project"
            >
              <Trash2 className="size-4 hover:scale-105" />
            </button>
          </div>

          {/* TYPE / TECH */}
          {project.type && (
            <div className="text-sm italic text-gray-600">
              {project.type}
            </div>
          )}

          {/* DESCRIPTION */}
          {project.description && (
            <p className="text-sm mt-1 text-gray-700 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default Projects;
