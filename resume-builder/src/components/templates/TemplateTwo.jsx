import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import LoadingSpinner from "../LoadingSpinner";
import SortableItem from "../SortableItem";
import Skills from "../PreviewFields/Skills";
import Contact from "../PreviewFields/Contact";
import { useLocation, useParams } from "react-router-dom";
import { handleDragEnd } from "../../utils/handleDragEnd";
import { SECTION_MAP } from "../../utils/SectionMap";
import saveAllToDb from "../../utils/saveAll";

const TemplateTwo = ({
  formData,
  setFormData,
  sectionVisibility,
  previewLoading,
  imageLoading,
  setDraftEducation,
  resumeStep,
  setResumeStep,
  draftExperience,
  setDraftExperience,
  setEditingIndex,
  setDraftProject,
  setDraftAchievement,
  setDeletionIndex,
  templateId,
  setPreviewLoading
}) => {

  const location = useLocation();
  const { sectionOrder } = formData;
  const isViewMode = location.pathname.startsWith("/view");
  const { resumeId } = useParams();

  return (
    <div className="relative font-[Inter] mt-5">

      {previewLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner color="black" />
        </div>
      )}

      <div className="form-animate w-[780px] min-h-[700px] flex bg-white">

        {/* Dark sidebar — self-start so it only grows as tall as its content */}
        <aside className="w-[195px] shrink-0 self-start bg-slate-800 text-white flex flex-col items-center gap-5 px-4 py-6">

          {sectionVisibility.profilePic && (
            <div className={`w-20 h-20 rounded-full overflow-hidden ring-2 ring-slate-500 shadow-md ${imageLoading ? "border border-white" : ""}`}>
              {formData.profileImageObject.profileImageUrl ? (
                imageLoading ? (
                  <LoadingSpinner color="white" />
                ) : (
                  <img
                    src={formData.profileImageObject.profileImageUrl}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                )
              ) : (
                <div className="w-full h-full bg-slate-600" />
              )}
            </div>
          )}

          {sectionVisibility.skills && (
            <div className="w-full">
              <Skills formData={formData} setResumeStep={setResumeStep} sidebar={true} />
            </div>
          )}

        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0">

          {/* Contact header — white background, subtle bottom border */}
          <div className="px-5 py-4 border-b border-gray-100">
            <Contact formData={formData} setResumeStep={setResumeStep} />
          </div>

          {/* Sections */}
          <div className="flex-1 px-5 py-3 text-gray-800">
            {!isViewMode ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, sectionOrder, resumeStep, formData, setFormData)}
              >
                <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                  <div className="space-y-1">
                    {sectionOrder
                      .filter((id) => id !== "skills" && sectionVisibility[id])
                      .map((id) => {
                        const Section = SECTION_MAP[id];
                        return (
                          <SortableItem key={id} id={id}>
                            <div className="hover:bg-gray-50 transition rounded-md px-1">
                              <Section
                                formData={formData}
                                setFormData={setFormData}
                                setDraftEducation={setDraftEducation}
                                setResumeStep={setResumeStep}
                                draftExperience={draftExperience}
                                setDraftExperience={setDraftExperience}
                                setEditingIndex={setEditingIndex}
                                setDraftProject={setDraftProject}
                                setDraftAchievement={setDraftAchievement}
                                setDeletionIndex={setDeletionIndex}
                                templateId={templateId}
                              />
                            </div>
                          </SortableItem>
                        );
                      })}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="space-y-1">
                {sectionOrder
                  .filter((id) => id !== "skills" && sectionVisibility[id])
                  .map((id) => {
                    const Section = SECTION_MAP[id];
                    return (
                      <div key={id}>
                        <Section formData={formData} />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

        </main>
      </div>

      {!isViewMode && (
        <div className="saveAll absolute top-2 right-4 z-10">
          <button
            disabled={!(formData.change)}
            onClick={() => saveAllToDb(setPreviewLoading, formData, setFormData, resumeId)}
            className={`px-2 py-1 rounded ${
              !(formData.change) ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white"
            }`}
          >
            Save Changes
          </button>
        </div>
      )}

    </div>
  );
};

export default TemplateTwo;
