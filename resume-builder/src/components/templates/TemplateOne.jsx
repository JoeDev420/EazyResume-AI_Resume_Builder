import { useLocation, useSearchParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "../SortableItem";
import Contact from "../PreviewFields/Contact";
import LoadingSpinner from "../LoadingSpinner";
import { handleDragEnd } from "../../utils/handleDragEnd";
import { SECTION_MAP } from "../../utils/SectionMap";

const TemplateOne = ({
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
  setDeletionIndex
}) => {
  const location = useLocation();
  const { sectionOrder } = formData;
  const [searchParams, setSearchParams] = useSearchParams();

  const isViewMode = location.pathname.startsWith("/view");

  return (
    <div className="relative font-[Inter] mt-4 sm:mt-5">
      {/* LOADING OVERLAY */}
      {previewLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner color="black" />
        </div>
      )}

      {/* RESUME WRAPPER */}
      <div
        className={`
          bg-white
          mx-auto
          w-full
          max-w-[750px]
          min-h-[500px]
          shadow-sm
          ${!isViewMode && resumeStep === 1 ? "sm:sticky sm:top-0" : ""}
        `}
      >
        {/* INNER CONTENT */}
        <div className="w-full text-gray-800 px-4 sm:px-6 py-4">
          {/* HEADER */}
          <div className="flex flex-col items-center gap-1 pb-2">
            {sectionVisibility.profilePic && (
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full overflow-hidden ring-1 ring-gray-200 shadow-sm ${
                    imageLoading ? "border border-black" : ""
                  }`}
                >
                  {formData.profileImageObject.profileImageUrl ? (
                    imageLoading ? (
                      <LoadingSpinner color="black" />
                    ) : (
                      <img
                        src={formData.profileImageObject.profileImageUrl}
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
              </div>
            )}

            <Contact formData={formData} setResumeStep={setResumeStep} />
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-gray-200 my-2" />

          {/* SECTIONS */}
          {!isViewMode ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) =>
                handleDragEnd(
                  event,
                  sectionOrder,
                  resumeStep,
                  formData,
                  setFormData
                )
              }
            >
              <SortableContext
                items={sectionOrder}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1">
                  {sectionOrder
                    .filter((id) => sectionVisibility[id])
                    .map((id) => {
                      const Section = SECTION_MAP[id];
                      return (
                        <SortableItem key={id} id={id}>
                          <div className="px-1 sm:px-2 hover:bg-gray-50 transition rounded-md">
                            <Section
                              formData={formData}
                              setDraftEducation={setDraftEducation}
                              setResumeStep={setResumeStep}
                              draftExperience={draftExperience}
                              setDraftExperience={setDraftExperience}
                              setEditingIndex={setEditingIndex}
                              setDraftProject={setDraftProject}
                              setDraftAchievement={setDraftAchievement}
                              setDeletionIndex={setDeletionIndex}
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
                .filter((id) => sectionVisibility[id])
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
      </div>
    </div>
  );
};

export default TemplateOne;
