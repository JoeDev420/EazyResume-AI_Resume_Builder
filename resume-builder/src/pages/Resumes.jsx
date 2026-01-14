import React, { useEffect, useState } from "react";
import API from "../components/AxiosConfig";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/NavBar";

const Resumes = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await API.get("/resume/resumeGetAll");
        setResumes(response.data.resumes || []);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchResumes();
  }, []);

  const changePublic = async (resumeId, currentPublic) => {
    try {
      await API.put("/resume/update", {
        resumeStep: 8,
        resumeId,
        public: !currentPublic,
      });

      setResumes((prev) =>
        prev.map((resume) =>
          resume._id === resumeId
            ? { ...resume, public: !resume.public }
            : resume
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
<>
  <Navbar />
  
  <div className="max-w-6xl mx-auto mt-10">
    <h2 className="text-2xl font-semibold mb-6">Your Resumes</h2>

  
    <div className="border border-gray-300 rounded-xl overflow-hidden">

    
      <div className="grid grid-cols-5 gap-x-45 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-700 border-b border-gray-300 items-center ">
        <div className="ml-4">Name</div>
        <div>Visibility</div>
        <div className="text-right mr-3">Toggle</div>
        <div className="ml-3">Edit</div>
        <div className="ml-5 w-20">Copy Link</div>
      </div>

      <div className="flex flex-col">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="grid grid-cols-5 gap-x-50 px-6 py-4 border-b border-gray-200 last:border-b-0 items-center"
          >
          
            <div className="font-medium text-center">
             <button className="text-blue-600 hover:text-blue-800" onClick={()=>{navigate(`/view/${resume.slug}`)}}>{resume.title}</button>
            </div>

            <div
              className={`text-sm ${
                resume.public ? "text-green-600" : "text-gray-500"
              }`}
            >
              {resume.public ? "Public" : "Private"}
            </div>

            <div className="text-right">
              <button
                onClick={() => changePublic(resume._id, resume.public)}
                className="px-4 py-1 rounded-full text-sm bg-indigo-500 text-white hover:opacity-90 transition"
              >
                Toggle
              </button>
            </div>

            <div>
                <button
                onClick={() => navigate(`/app/builder/${resume._id}?resumeStep=1`)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
            </div>


            <div className="w-30 mr-10">
                <button
                onClick={async() => {await navigator.clipboard.writeText(`http://localhost:5173/view/${resume.slug}`)
                                      toast.success("Copied")

                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Copy Link
              </button>
            </div>


          </div>
        ))}

        {resumes.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No resumes found.
          </p>
        )}
      </div>
    </div>
  </div>

  </>
);

};

export default Resumes;
