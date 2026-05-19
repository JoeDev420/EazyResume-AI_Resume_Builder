import { Mail, Phone, MapPin, Linkedin, Globe, Pencil } from "lucide-react";
import { scrollToTop } from "../../utils/scrollToTop";
import { useSearchParams, useLocation } from "react-router-dom";

const Contact = ({ formData, textColor, setResumeStep }) => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isViewMode = location.pathname.startsWith("/view");

  const baseText = textColor || "text-gray-900";
  const mutedText = textColor ? textColor + " opacity-75" : "text-gray-600";
  const linkText = textColor ? textColor : "text-[#2563EB]";

  return (
    <div className="text-center">
      {/* Name */}
      <h1 className={`font-bold text-[26px] leading-tight tracking-tight ${baseText}`}>
        <span className="relative inline-block">
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
              className="absolute -right-7 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow"
            >
              <Pencil className="w-3.5 h-3.5 text-blue-500" />
            </button>
          )}
        </span>
      </h1>

      {/* Profession */}
      {formData.profession && (
        <p className={`text-[16px] font-medium mt-0.5 ${mutedText}`}>
          {formData.profession}
        </p>
      )}

      {/* Contact row */}
      <div className={`flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2 text-[11px] ${mutedText}`}>
        {formData.email && (
          <span className="flex items-center gap-1">
            <Mail size={11} />
            {formData.email}
          </span>
        )}
        {formData.phone && (
          <span className="flex items-center gap-1">
            <Phone size={11} />
            {formData.phone}
          </span>
        )}
        {formData.location && (
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {formData.location}
          </span>
        )}
        {formData.linkedin && (
          <a
            href={formData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 hover:underline ${linkText}`}
          >
            <Linkedin size={11} />
            {formData.linkedinShort || "LinkedIn"}
          </a>
        )}
      </div>

      {/* Website links */}
      {formData.website?.length > 0 && (
        <div className={`flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1 text-[11px] ${linkText}`}>
          {formData.website.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Globe size={11} />
              {formData.websiteShort?.[i] || url}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
