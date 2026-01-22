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

  // ✅ SAME LOGIC AS EDUCATION
  const isViewMode = location.pathname.startsWith("/view");

  return (
    <>
      {/* NAME */}
      <h1
        className={`relative text-[21px] font-semibold text-center wrap-break-word min-w-0 ${
          textColor || "text-gray-600"
        }`}
      >
        {formData.fullName || "Your Name"}

        {/* EDIT – hidden in view mode */}
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
            className="absolute top-0 -right-7 bg-white rounded-full p-1 shadow"
            aria-label="Edit Contact"
          >
            <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-700" />
          </button>
        )}
      </h1>

      {/* PROFESSION */}
      {formData.profession && (
        <h2 className="text-xl font-semibold text-center wrap-break-word min-w-0">
          {formData.profession}
        </h2>
      )}

      {/* CONTACT DETAILS */}
      <div className="flex flex-wrap gap-x-3 mt-1 text-sm p-1 justify-center">
        {formData.email && (
          <span className="flex items-center gap-1">
            <Mail size={12} /> {formData.email}
          </span>
        )}

        {formData.phone && (
          <span className="flex items-center gap-1">
            <Phone size={12} /> {formData.phone}
          </span>
        )}

        {formData.location && (
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {formData.location}
          </span>
        )}

        {formData.linkedin && (
          <span className="flex items-center gap-1 text-blue-600">
            <Linkedin size={12} />
            <a
              href={formData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {formData.linkedinShort || formData.linkedin}
            </a>
          </span>
        )}
      </div>

      {/* WEBSITES */}
      {formData.website?.length > 0 && (
        <div className="flex flex-col items-center mt-1 text-sm">
          {formData.website.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
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
