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
      {/* NAME */}
      <h1
        className={`relative text-[18px] sm:text-[21px] font-semibold text-center break-words ${
          textColor || "text-gray-700"
        }`}
      >
        {formData.fullName || "Your Name"}

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
            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow"
          >
            <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-700" />
          </button>
        )}
      </h1>

      {/* PROFESSION */}
      <h2 className="text-base sm:text-lg font-semibold text-center break-words text-gray-800">
        {formData.profession}
      </h2>

      {/* CONTACT DETAILS */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm text-gray-600 px-2">
        <span className="flex items-center gap-1 break-all">
          <Mail size={12} />
          {formData.email || "email@example.com"}
        </span>

        <span className="flex items-center gap-1">
          <Phone size={12} />
          {formData.phone || "000–000–0000"}
        </span>

        <span className="flex items-center gap-1 break-words">
          <MapPin size={12} />
          {formData.location || "City, Country"}
        </span>

        {formData.linkedin && (
          <a
            href={formData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline break-all"
          >
            <Linkedin size={12} />
            {formData.linkedinShort || formData.linkedin}
          </a>
        )}
      </div>

      {/* WEBSITES */}
      {formData.website?.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm">
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
