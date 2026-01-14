import React from "react";
import {Pencil,Trash2} from "lucide-react"
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const Skills = ({ formData,setResumeStep}) => {

  const [searchParams,setSearchParams] = useSearchParams()

  const skills = formData.skills?.length
    ? formData.skills
    : [];

    

  return (
    <section className="mb-4">

      <div className="flex gap-2">
        <h2 className="text-sm font-semibold tracking-wide mb-1">
          SKILLS
        </h2>

        <button
            onClick={() => {
                          setResumeStep(4);

                          setSearchParams((params) => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",4);
                            return p;
                            })

                          scrollToTop()

                        }}
                        className={`${formData.skills?.length?"text-red-400 hover:text-red-500":"hidden"}`}
                      >
                        <Pencil className="size-4 hover:scale-105" />            
        </button>
        
      </div>

      <div className="flex flex-wrap gap-2 pl-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-100 text-white-600 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
