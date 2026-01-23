import React, { useEffect, useState, useRef } from "react";
import TemplateRenderer from "../components/templates/TemplateRender";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import API from "../components/AxiosConfig";
import { useAuth } from "../components/AuthContext";

const Preview = () => {
  const navigate = useNavigate();
  const ResumeRef = useRef(null);
  const { resumeSlug } = useParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState(null);
  const [searchParams] = useSearchParams();
  const isPrint = searchParams.get("print") === "true";

  const Download = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/pdf/resume/${resumeSlug}`,
      "_blank"
    );
  };

  const ShareHandler = async () => {
    const shareLink = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: formData.title, url: shareLink });
      } catch (err) {
        console.log(err);
      }
    } else {
      await navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard");
    }
  };

  const changePublic = async () => {
    try {
      await API.put("/resume/update", {
        resumeStep: 9,
        resumeId: formData._id,
        public: !formData.public
      });

      setFormData((prev) => ({ ...prev, public: !prev.public }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getResumeData = async () => {
      try {
        const response = await API.get(
          `/resume/ResumePreview/${resumeSlug}`
        );
        if (response.data.resume) {
          setFormData(response.data.resume);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getResumeData();
  }, [resumeSlug]);

  if (!formData)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-4 flex flex-col items-center">
      
      {!isPrint && (
        <div className="w-full max-w-4xl mb-6 flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            onClick={() => navigate(`/resumes`)}
            className="text-blue-500 font-medium text-sm sm:text-base"
          >
            View All Resumes
          </button>

          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 bg-purple-300 rounded-2xl text-sm"
              onClick={Download}
            >
              Download
            </button>

            <button
              className="px-4 py-2 bg-blue-300 rounded-2xl text-sm"
              onClick={ShareHandler}
            >
              Share
            </button>

            {user?._id === formData.userId && (
              <button
                className={`px-4 py-2 rounded-2xl text-sm ${
                  formData.public ? "bg-green-300" : "bg-red-400"
                }`}
                onClick={changePublic}
              >
                {formData.public ? "Public" : "Private"}
              </button>
            )}
          </div>
        </div>
      )}


      <div
        ref={ResumeRef}
        className="
          bg-white shadow-lg
          w-full max-w-4xl
          flex justify-center
          overflow-hidden
        "
      >

        <div className="origin-top scale-[0.85] sm:scale-100">
          <TemplateRenderer
            templateId={formData.templateId}
            formData={formData}
            sectionVisibility={formData.sectionVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
