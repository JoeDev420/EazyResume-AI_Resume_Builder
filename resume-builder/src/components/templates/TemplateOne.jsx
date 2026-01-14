import { useLocation, useSearchParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "../SortableItem";
import Contact from "../PreviewFields/Contact";
import LoadingSpinner from "../LoadingSpinner";
import { handleDragEnd } from "../../utils/handleDragEnd";
import { SECTION_MAP } from "../../utils/SectionMap";
import { Pencil } from "lucide-react";
import { scrollToTop } from "../../utils/scrollToTop";

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

  return (
    <div className="form-animate relative w-[750px] min-h-[700px] font-[Inter] mt-5">

      {previewLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner color="black" />
        </div>
      )}

      <div className={`w-[750px] flex min-h-[500px] justify-center self-start ${resumeStep===1 ? "sticky top-0" : ""} bg-white border border-gray-200 shadow-sm`}>

        <div className="max-w-[750px] w-full text-gray-800 px-6 py-4">

          <div className="flex flex-col items-center gap-1 pb-2">

            {sectionVisibility.profilePic && (
              <div className="relative">
                <div className={`w-20 h-20 rounded-full overflow-hidden ring-1 ring-gray-200 shadow-sm ${imageLoading ? "border border-black" : ""}`}>
                  {formData.profileImageObject.profileImageUrl ? (
                    imageLoading ? (
                      <LoadingSpinner color={"black"} />
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

                <button
                  onClick={() => {
                    setResumeStep(1);
                    setSearchParams((params) => {
                      const p = new URLSearchParams(params);
                      p.set("resumeStep", 1);
                      return p;
                    });
                    scrollToTop();
                  }}
                  className="absolute top-0 -right-4 bg-white rounded-full p-1 shadow"
                >
                  <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-700" />
                </button>
              </div>
            )}

            <Contact formData={formData} />
          </div>

          <div className="h-px bg-gray-200 my-2" />

          {!location.pathname.startsWith("/view") ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => { handleDragEnd(event, sectionOrder, resumeStep, formData, setFormData) }}
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
                          <div className="pb-1 border-b last:border-none hover:bg-gray-50 transition rounded-md px-2">
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
                    <div key={id} className="pb-1 border-b last:border-none">
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
