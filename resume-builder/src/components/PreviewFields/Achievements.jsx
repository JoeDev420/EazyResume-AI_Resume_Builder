import {Pencil,Trash2} from "lucide-react"
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop.js";

const Achievements = ({ formData,setEditingIndex,setResumeStep,setDraftAchievement,setDeletionIndex }) => {


  const [searchParams,setSearchParams] = useSearchParams()

  const achievements = formData.achievements?.length
    ? formData.achievements
    : [
        {
          title: "Winner – Intercollegiate Hackathon",
          issuer: "TechFest 2023",
          description:
            "Built an AI scheduling tool selected as 1st place among 200+ teams."
        }
      ];

  return (
    <section className="mb-4 wrap-break-word">
      <h2 className="text-sm font-semibold tracking-wide mb-1">
        AWARDS & ACHIEVEMENTS
      </h2>

      {achievements.map((item, i) => (
        <div key={i} className="mb-3 pl-3 flex flex-col">
          

        <div className="flex gap-2"> 
          <div className="font-medium text-md">
            {item.title}
          </div>


          <button
              onClick={(e) => {
                e.stopPropagation();
                setDraftAchievement(item);
                setEditingIndex(i);
                setDeletionIndex(null)
                setResumeStep(7); // achievement step
                

                 setSearchParams((params) => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",7);
                            return p;
                            })

                    
                  scrollToTop()       }
                  
                  }

                    className={`${formData.achievements?.length
          ?"text-red-400 hover:text-red-500":"hidden"}`}
                  >
                    <Pencil className="size-4 hover:scale-105" />
          </button>

          <button
                          onClick={(e) => {

                            setSearchParams((params) => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",7);
                            return p;
                            })
                            
                            setDraftAchievement(item)
                            setResumeStep(7);
                            setDeletionIndex(i)
                            setEditingIndex(null)
                            scrollToTop()
                          }}
                          className={`${formData.achievements?.length?"text-red-400 hover:text-red-500":"hidden"}`}
                          aria-label="Edit education"
                        >
                          <Trash2 className="size-4 hover:scale-105" />
          </button>


        </div> 


          {item.issuer && (
            <div className="italic text-gray-600">
              {item.issuer}
            </div>
          )}

          <p className="text-gray-700 mt-1 leading-relaxed">
            {item.description}
          </p>

        </div>
      ))}
    </section>
  );
};

export default Achievements;
