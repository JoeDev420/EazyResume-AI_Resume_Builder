import React from 'react'
import {Pencil,Trash2} from "lucide-react"
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from '../../utils/scrollToTop';

const Summary = ({formData,setResumeStep}) => {

  const [searchParams,setSearchParams] = useSearchParams()

  const { professionalsummary } = formData;

  return (
    <section className="mb-4 relative wrap-break-word">
            <h2 className="text-sm font-semibold tracking-wide mb-1">
              PROFESSIONAL SUMMARY
            </h2>

            <p
              className={`text-sm leading-relaxed pl-3 ${
                professionalsummary
                  ? "text-gray-800 "
                  : "italic text-gray-400"
              }`}
            >
              {professionalsummary ||
                "Briefly describe your experience, strengths, and career goals here."}
            </p>


            <span className='absolute top-0 -right-2 z-10' onClick={()=>{

                        setSearchParams((params) => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",2);
                            return p;
                            })

                        setResumeStep(2)    //return back to summary page

                        scrollToTop()

                        

            
                      }}><Pencil className={`${formData.professionalsummary?.length
                    ?"text-red-400 hover:text-red-500 hover:scale-105 size-4":"hidden"}`} /></span>
          </section>
  )
}

export default Summary