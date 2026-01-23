import { useState, useEffect } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import LoadingSpinner from "../LoadingSpinner";

import SortableItem from "../SortableItem";
import Skills from "../PreviewFields/Skills";
import Contact from "../PreviewFields/Contact";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { handleDragEnd } from "../../utils/handleDragEnd";
import { SECTION_MAP } from "../../utils/SectionMap";

import { scrollToTop } from "../../utils/scrollToTop";
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

  const {resumeId} = useParams()

  return (
    <div className="relative font-[Inter] mt-5">

      {previewLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner color="black" />
        </div>
      )}

      <div className="form-animate w-[750px] min-h-[700px] flex justify-center bg-white ">
        <div className="max-w-[750px] min-h-[500px] w-full px-6 py-4 text-gray-800">

          <div className={`flex flex-col ${resumeStep===1 ? "sticky top-0" : ""} md:flex-row gap-4`}>

            <aside className="w-full md:w-[180px] shrink-0 flex flex-col items-center gap-4">

              {sectionVisibility.profilePic && (
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full overflow-hidden ring-1 ring-gray-200 shadow-sm ${imageLoading ? "border border-black" : ""}`}>
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

              {sectionVisibility.skills && (
                <div className="w-full">
                  <Skills formData={formData} setResumeStep={setResumeStep} />
                </div>
              )}

            </aside>

            <main className="flex flex-col flex-1 gap-1">

              <div className="text-center md:text-left pb-2">
                
                <Contact formData={formData} templateId={templateId} setResumeStep={setResumeStep} />
              </div>

              <div className="h-px bg-gray-200 my-2" />

              {!location.pathname.startsWith('/view') ? (
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, sectionOrder, resumeStep, formData, setFormData)}
                >
                  <SortableContext
                    items={sectionOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-1">
                      {sectionOrder
                        .filter((id) => id !== "skills" && sectionVisibility[id])
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

            </main>

          </div>
        </div>
      </div>


      {!isViewMode  && ( <div className='saveAll absolute top-2 right-4 z-10 '>
          <button
              disabled={!(formData.change)}
              onClick={() => saveAllToDb(setPreviewLoading,formData,setFormData,resumeId)

                

              }
              className={`px-2 py-1 rounded ${
                !(formData.change)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
            >
              Save Changes
            </button>
        </div>)}

    </div>
  );
};

export default TemplateTwo;