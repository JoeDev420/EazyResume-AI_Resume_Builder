import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Pencil
} from "lucide-react";
import { scrollToTop } from "../../utils/scrollToTop";
import { useSearchParams, useLocation } from "react-router-dom";

const Contact = ({ formData, textColor, setResumeStep }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");


  return (
    <>
    
      <div className="flex justify-center items-center gap-2">
        <h1
          className={`font-semibold text-[18px] sm:text-[21px] ${
            textColor || "text-gray-700"
          }`}
        >
          {formData.fullName || "Your Name"}
        </h1>
        {!isViewMode && (
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
            className="bg-white rounded-full p-1 shadow shrink-0"
          >
            <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-700" />
          </button>
        )}
      </div>


      
      <h2 className={`text-base sm:text-lg font-semibold text-center break-words ${textColor} `}>
        {formData.profession}
      </h2>

      
      <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm ${textColor} px-2`}>
        <span className="flex items-center gap-1 break-all">
          <Mail size={12} />
          {formData.email || "email@example.com"}
        </span>

        <span className={`${textColor} flex items-center gap-1`}>
          <Phone size={12} />
          {formData.phone || "000–000–0000"}
        </span>

        <span className={`${textColor} flex items-center gap-1 break-words`}>
          <MapPin size={12} />
          {formData.location || "City, Country"}
        </span>

        {formData.linkedin && (
          <a
            href={formData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textColor} flex items-center gap-1 text-blue-600 hover:underline break-all`}
          >
            <Linkedin size={12} />
            {formData.linkedinShort || formData.linkedin}
          </a>
        )}
      </div>

  
      {formData.website?.length > 0 && (
        <div className={`${textColor} flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm`}>
          {formData.website.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {formData.websiteShort?.[i] || url}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Contact;
