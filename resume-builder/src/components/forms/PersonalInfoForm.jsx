import React, { useEffect, useState } from "react";
import { User, Trash2 } from "lucide-react";
import Next from "../ResumeNavigator";
import ResumeNavigator from "../ResumeNavigator";
import API from "../AxiosConfig.jsx";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/scrollToTop.js";

const PersonalInfoForm = ({ formData, setFormData, setResumeStep , resumeStep, setPreviewLoading,imageLoading,setImageLoading }) => {

  

  const {

      fullName,
      email,
      profession,
      phone,
      location,
      linkedin,
      website,
      profileImageObject,
      

    } = formData


  const miniForm = {

      fullName,
      email,
      profession,
      phone,
      location,
      linkedin,
      website,
      profileImageObject

                  } 


  const [draftWebsite, setDraftWebsite] = useState("");

  const {resumeId} = useParams()
  // -------------------------------
  // Shared change handler
  // -------------------------------
  const handleChange = (e) => {


    const { name, value } = e.target;

    if (name === "website") {
      setDraftWebsite(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      change:true
    }));

  };

  // -------------------------------
  // Add website
  // -------------------------------
  const websiteSubmit = (e) => {
    e.preventDefault();

    if (!draftWebsite.trim()) return;

    setFormData((prev) => ({
      ...prev,
      website: [...prev.website, draftWebsite],
    }));

    setDraftWebsite("");
  };

  // -------------------------------
  // Reset form
  // -------------------------------
  const resetForm = () => {

    setFormData((prev) => ({

      ...prev,
      profileImageObject: {profileImageUrl:"",
                          
      },
      fullName: "",
      email: "",
      profession: "",
      phone: "",
      location: "",
      linkedin: "",
      website: [],

    }));

    

  };

  // -------------------------------
  // Image upload
  // -------------------------------
 const imageSubmit = async (e) => {


    const file = e.target.files[0];

    if (!file) return;

    setImageLoading(true)

    const fd = new FormData();

    fd.append("image", file);
    fd.append("resumeId",resumeId)


    const res = await API.post("/resume/updateImage", fd);  //get imagekit url for image

    setFormData(prev => ({
      ...prev,
      profileImageObject: {profileImageUrl:res.data.url,
                        
      },
      change:true
    }));

    setImageLoading(false)

};







  return (


    <>

    <ResumeNavigator miniForm={miniForm}
                     setResumeStep={setResumeStep}
                     resumeStep={resumeStep} 
                     setPreviewLoading= {setPreviewLoading}
                     formData={formData}
                     setFormData={setFormData}
    />


    <form className="form-animate flex flex-col gap-5 bg-white p-4">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Personal Info</p>

        <button
          type="button"
          onClick={resetForm}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex gap-7 items-center">
        <div className=" w-20 h-20 flex items-center justify-center overflow-hidden">
          { (!profileImageObject.profileImageUrl) && (
            <div className=" relative w-20 h-20 border flex justify-center items-center border-black rounded-full p-5">
              {imageLoading?<LoadingSpinner color={"black"}/>:<User size={28} />}
            </div>
          ) }

          {profileImageObject.profileImageUrl && (
          <div className={`w-20 h-20 relative rounded-full ${imageLoading?"border border-black":""}`}>
             {imageLoading?<LoadingSpinner color={"black"}/>:<img
              src={profileImageObject.profileImageUrl}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          }
          </div>
          )}
        </div>

        <div className="text-sm text-blue-500 cursor-pointer">
          {profileImageObject.profileImageUrl && (
            <div className="flex gap-7">
        

              <label htmlFor="profPic" className={`${imageLoading?"cursor-not-allowed":"cursor-pointer"}`}>
                Change Picture
              </label>
            </div>
          )}

          {!profileImageObject.profileImageUrl && (
            <label htmlFor="profPic" className="cursor-pointer">
              Choose Picture
            </label>
          )}

          <input
            type="file"
            id="profPic"
            className="hidden"
            onChange={imageSubmit}
            accept="image/*"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label>Full Name</label>
          <input
            name="fullName"
            type="text"
            maxLength={60}
            placeholder="Enter your full name"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Profession</label>
          <input
            name="profession"
            type="text"
            placeholder="FullStack Developer"
            required
            value={formData.profession}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Location</label>
          <input
            name="location"
            type="text"
            placeholder="e.g. New York, USA"
            value={formData.location}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>LinkedIn Profile</label>
          <input
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedin}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label>Personal Website</label>

            <div className="flex gap-2">
              <button
                type="button"
                className="bg-blue-500 p-2 rounded-xl text-white"
                onClick={websiteSubmit}
              >
                Add
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    website: [],
                  }))
                }
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          </div>

          <input
            name="website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={draftWebsite}
            onChange={handleChange}
            className="h-10 border border-gray-300 p-2"
          />
        </div>
      </div>
    </form>
    </>
  );
};

export default PersonalInfoForm;
