import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";
import SortableEntry from "../SortableEntry";

const Projects = ({
  formData,
  setFormData,
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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const next = [...formData.projects];
    const [moved] = next.splice(active.id, 1);
    next.splice(over.id, 0, moved);

    setFormData(prev => ({ ...prev, projects: next, change: true }));
  };

  const entryIds = formData.projects?.map((_, i) => i) ?? [];

  const renderEntry = (project, i) => (
    <div className="mb-4">
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
        <div className="text-[11px] text-gray-600 mt-0.5">{project.type}</div>
      )}

      {project.description && (
        <p className="text-[12px] leading-[1.65] text-gray-700 mt-1">{project.description}</p>
      )}
    </div>
  );

  return (
    <section className="mb-5 break-words">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB] shrink-0">
          Projects
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {!isViewMode && formData.projects?.length > 1 ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={entryIds} strategy={verticalListSortingStrategy}>
            {formData.projects.map((project, i) => (
              <SortableEntry key={i} id={i}>
                {renderEntry(project, i)}
              </SortableEntry>
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        projects.map((project, i) => (
          <div key={i}>{renderEntry(project, i)}</div>
        ))
      )}
    </section>
  );
};

export default Projects;
