import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "../SortableItem";

import Contact from "../PreviewFields/Contact";

import { SECTION_MAP } from "../../utils/SectionMap";

import { handleDragEnd } from "../../utils/handleDragEnd";
import { useLocation, useSearchParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { scrollToTop } from "../../utils/scrollToTop";

const TemplateThree = ({
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
    <div className="relative font-[Inter] mt-5">

      {previewLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner color="black" />
        </div>
      )}

      <div className="form-animate w-[750px] min-h-[700px] flex justify-center bg-white border border-gray-200 shadow-sm">
        <div className={`max-w-[750px] w-full text-gray-800 ${resumeStep === 1 ? "sticky top-0" : ""}`}>

          <div className="bg-slate-800 text-white px-6 py-4 flex items-center gap-5 justify-center relative">
            
            {sectionVisibility.profilePic && (
              <div className="absolute left-10 top-2">
                <div className={`w-20 h-20 rounded-full overflow-hidden ring-2 ring-white shadow-lg ${imageLoading ? "border border-black" : ""}`}>
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

                
              </div>
            )}

            <div>
              <Contact formData={formData} textColor="text-gray-200" />
            </div>
          </div>

          <div className="px-6 py-4">
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
                            <div className=" hover:bg-gray-50 transition rounded-md px-2">
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

    </div>
  );
};

export default TemplateThree;