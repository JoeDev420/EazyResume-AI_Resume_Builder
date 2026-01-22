import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Pencil
} from "lucide-react";
import { scrollToTop } from '../../utils/scrollToTop';



const Contact = ({formData,textColor}) => {


  return (
    <>

              <h1 className={` relative text-[21px] text-md font-semibold text-center wrap-break-word min-w-0 ${textColor||"text-gray-600"}`}>
                {formData.fullName || "Your Name"}

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
                                  className="absolute top-0 -right-7 bg-white rounded-full p-1 shadow"
                                >
                                  <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-700" />
                 </button>

              </h1>

              <h1 className="text-xl font-semibold text-center wrap-break-word min-w-0">
                {formData.profession}
              </h1>

    <div className="flex flex-wrap gap-x-3 mt-1 text-sm p-1 justify-center">


              <span className="flex items-center gap-1">
                <Mail size={12}/> {formData.email || "email@example.com"}
              </span>

              <span className="flex items-center gap-1">
                <Phone size={12}/> {formData.phone || "000–000–0000"}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={12}/> {formData.location || "City, Country"}
              </span>

              <span className="flex items-center gap-1 text-blue-400">
                {formData.linkedin && <Linkedin size={12} />}
                {formData.linkedinShort || ""}
              </span>

            </div>

              <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
                 {formData.website.length!=0?formData.website.map((website,i)=>(
                <div className='flex items-center justify-center gap-1'  key={i}>
                    <Globe size={12}/> <div>{formData.websiteShort[i]}</div>
                </div>

                ) ): ""}
              </div>

        </>
  )
}

export default Contact