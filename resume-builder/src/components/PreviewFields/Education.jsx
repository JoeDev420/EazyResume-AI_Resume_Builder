import React from "react";
import DateFormatter from "../DateFormatter";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Education = ({ formData,setDraftEducation,setResumeStep,setEditingIndex,setDeletionIndex }) => {

  const [searchParams,setSearchParams] = useSearchParams()

  const education = formData.education?.length
    ? formData.education
    : [
        {
          degree: "Degree Name",
          field: "Field of Study",
          institute: "Institution Name",
          graduationDate: "2023-03",
          cgpa: ""
        }
      ];

  return (
    <section className="mb-4 wrap-break-word">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        EDUCATION
      </h2>

      {education.map((edu, i) => (

        <div key={i} className="mb-3 pl-3">
          

          <div className="flex justify-between items-start text-sm font-medium gap-4">
            <span className="flex-1 inline-flex items-center gap-1">
              {edu.degree}
              {edu.field && ` — ${edu.field}`}

              <button
                onClick={(e) => {
                  setDraftEducation(edu);
                  setResumeStep(3);
                  setEditingIndex(i)
                  setDeletionIndex(null)

                   setSearchParams((params) => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",3);
                            return p;
                            })

                    scrollToTop()

                }}
                className="text-red-400 hover:text-red-500 hover:scale-105"
                aria-label="Edit education"
              >
                <Pencil className="size-4 hover:scale-105" />
              </button>

              <button
                onClick={(e) => {
                  setDraftEducation(edu);
                  setResumeStep(3);
                  setDeletionIndex(i)
                  setEditingIndex(null)

                   setSearchParams((params) => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",3);
                            return p;
                            })

                scrollToTop()
                            }
                
              }

                className={`${formData.education?.length?"text-red-400 hover:text-red-500":"hidden"}`}
                aria-label="Edit education"
              >
                <Trash2 className="size-4 hover:scale-105" />
              </button>
            </span>

            <span className="text-gray-500 whitespace-nowrap text-right">
              <DateFormatter value={edu.graduationDate} />
            </span>
          </div>

          <div className="text-sm italic text-gray-600">
            {edu.institute}
          </div>

          {edu.cgpa && (
            <div className="text-sm text-gray-600">
              CGPA: {edu.cgpa}
            </div>
          )}

          {/*add pencil icon to edit this entry in draft education state. clicking on it re-enters the data in
          draft education state */}


        </div>
      ))}
    </section>
  );
};

export default Education;
