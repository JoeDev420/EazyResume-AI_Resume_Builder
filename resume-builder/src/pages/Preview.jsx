import { useEffect, useState, useRef } from "react";
import TemplateRenderer from "../components/templates/TemplateRender";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import API from "../components/AxiosConfig";
import { useAuth } from "../components/AuthContext";

// Scales the A4 template (794px wide) to fit any container width
const ScaledResume = ({ formData }) => {
  const containerRef = useRef(null);
  const resumeRef    = useRef(null);
  const [scale, setScale] = useState(() =>
    typeof window !== 'undefined'
      ? Math.min(1, (window.innerWidth - 24) / 794)
      : 1
  );
  const [wrapperHeight, setWrapperHeight] = useState('auto');

  useEffect(() => {
    const update = () => {
      const containerW = containerRef.current?.offsetWidth ?? window.innerWidth;
      const resumeH    = resumeRef.current?.offsetHeight ?? 1122;
      const newScale   = Math.min(1, containerW / 794);
      setScale(newScale);
      setWrapperHeight(resumeH * newScale);
    };

    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    if (resumeRef.current)    ro.observe(resumeRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white shadow-lg overflow-hidden" style={{ height: wrapperHeight }}>
      <div
        ref={resumeRef}
        style={{
          width: 794,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        <TemplateRenderer
          templateId={formData.templateId}
          formData={formData}
          sectionVisibility={formData.sectionVisibility}
        />
      </div>
    </div>
  );
};

const Preview = () => {
  const navigate = useNavigate();
  const { resumeSlug } = useParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState(null);
  const [searchParams] = useSearchParams();
  const isPrint = searchParams.get("print") === "true";

  const Download = () => {
    window.open(`${import.meta.env.VITE_API_URL}/pdf/resume/${resumeSlug}`, "_blank");
  };

  const ShareHandler = async () => {
    const shareLink = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: formData.title, url: shareLink }); }
      catch (err) { console.log(err); }
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
      setFormData(prev => ({ ...prev, public: !prev.public }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getResumeData = async () => {
      try {
        const response = await API.get(`/resume/ResumePreview/${resumeSlug}`);
        if (response.data.resume) setFormData(response.data.resume);
      } catch (error) {
        console.log(error);
      }
    };
    getResumeData();
  }, [resumeSlug]);

  if (!formData) return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-[3px] border-gray-300 border-t-gray-700 rounded-full animate-spin" />
      <p className="text-sm text-gray-500">Loading resume…</p>
    </div>
  );

  if (isPrint) {
    return (
      <TemplateRenderer
        templateId={formData.templateId}
        formData={formData}
        sectionVisibility={formData.sectionVisibility}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-4 flex flex-col items-center">

      {/* Toolbar */}
      <div className="w-full max-w-4xl mb-4 flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          onClick={() => navigate('/resumes')}
          className="text-blue-500 font-medium text-sm self-start"
        >
          ← View All Resumes
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
              className={`px-4 py-2 rounded-2xl text-sm ${formData.public ? "bg-green-300" : "bg-red-400"}`}
              onClick={changePublic}
            >
              {formData.public ? "Public" : "Private"}
            </button>
          )}
        </div>
      </div>

      {/* Resume — scales to fit any screen width */}
      <div className="w-full max-w-4xl">
        <ScaledResume formData={formData} />
      </div>

    </div>
  );
};

export default Preview;
