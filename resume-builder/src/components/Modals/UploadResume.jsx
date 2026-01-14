import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import API from "../AxiosConfig";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";

const UploadResumeModal = ({
  open,
  onClose,
  uploadFile,
  setUploadFile,
}) => {


    const [uploadLoading, setUploadLoading] = useState(null);

    const {user} = useAuth()

    const isPremium = user.premium

    const navigate = useNavigate()


const submitHandler = async (e) => {

    e.preventDefault()

   
    try{

        const fd = new FormData();

        fd.append("resume",uploadFile)

        setUploadLoading(true)

        const response = await API.post('/ai/UploadResume',fd)

        
        if(response.data.success){

          toast.success("got the data")

          const data = response.data.aiFormData

          try {

            const response = await API.post('/resume/createUploadedResume', data )

            if(response.data.success){

              navigate(`/app/builder/${response.data.resumeId}`)

            }

            
          } catch (error) {

            setUploadLoading(false)

            console.log(error)
            
          }

        }

      } catch (error) {


        setUploadLoading(false)

        console.log(error.message)



        }


    };


  if(!isPremium && open){

    window.open("/Premium", "_blank");

    return <></>

  }
  
  return (
    <Modal isOpen={open} onClose={onClose}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-between h-full p-4"
      >
        <p className="text-2xl">Upload Resume</p>

        <label
          htmlFor="resume"
          className="border p-4 rounded-2xl cursor-pointer"
        >
          {uploadFile ? uploadFile.name : "Choose File"}
        </label>

        <input
          id="resume"
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={(e) => setUploadFile(e.target.files[0])}
        />

        <button
          disabled={!uploadFile}
          className={`relative w-40 h-10 border px-3 py-2 rounded-2xl bg-black text-white disabled:opacity-60 ${!uploadFile?"cursor-not-allowed":""}`}
        >
          {uploadLoading? <LoadingSpinner/>: "Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default UploadResumeModal;
