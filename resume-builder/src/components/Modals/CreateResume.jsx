import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";
import { useAuth } from "../AuthContext";
import API from "../AxiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateResumeModal = ({
  open,
  onClose,
  createValue,
  setCreateValue
}) => {


  const [createResumeLoading,setCreateResumeLoading] = useState(false)


  const {user} = useAuth()

  const navigate = useNavigate()


  



  const submitHandler = async (e) => {  

    try {
      
          e.preventDefault();

          const url = user.profileImageUrl  //by default it can be empty string ""

          setCreateResumeLoading(true)
        
          const response = await API.post("/resume/add",{title:createValue,profileImageUrl:url
        })

          if(response.data.resumeId){

            setCreateResumeLoading(false)

            navigate(`/app/builder/${response.data.resumeId}?resumeStep=1`)

            toast.success("Resume Created")

          }



      } catch (error) {

        setCreateResumeLoading(false)

        toast.error(error.response.data.message)
      
    }


    };



  return (
    <Modal isOpen={open} onClose={onClose}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-between h-full p-4"
      >
        <p className="text-2xl">Enter Resume Title</p>

        <textarea
          autoFocus
          rows={2}
          maxLength={60}
          className="w-80 border px-3 py-2 resize-none rounded-2xl text-center"
          value={createValue}
          onChange={(e) => setCreateValue(e.target.value)}
        />

        <button
          disabled={!createValue.trim()}
          className={`relative w-40 h-10 border px-3 py-2 rounded-2xl bg-black text-white disabled:opacity-60 ${!createValue.trim()?"cursor-not-allowed":""}`}
        >
          {createResumeLoading?<LoadingSpinner/>:"Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateResumeModal;
