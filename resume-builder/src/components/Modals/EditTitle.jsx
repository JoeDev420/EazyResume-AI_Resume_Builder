import { useState } from "react";
import API from "../axios";
import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";

const EditTitleModal = ({
  open,
  onClose,
  editValue,
  setEditValue,
  selectedId,
  setResumes
}) => {


   const [EditLoading,setEditLoading] = useState(false)


   const updateTitleHandler = async (e) => {

  
      try {
        
  
        e.preventDefault();

        setEditLoading(true)
  
        const response = await API.put("/resume/titleChange",{resumeId:selectedId,title:editValue})

        toast.success(response.data.message)
  
        setResumes(prev=>prev.map((resume)=>{
  
          if(resume._id===selectedId){
  
              return response.data.updatedResume
  
          }
  
          return resume
  
  
        }))

        setEditLoading(false)
  
        onClose()
  
        } catch (error) {

          setEditLoading(false)
  
          toast.error(error.response.data.message)
        
        
        
        }
  
  
      };
  




  return (
    <Modal isOpen={open} onClose={onClose}>
      <form
        onSubmit={updateTitleHandler}
        className="flex flex-col items-center justify-between h-full p-4"
      >
        <p className="text-2xl">Change Resume Title</p>

        <input
          autoFocus
          maxLength={60}
          className="w-80 h-14 border px-3 rounded-2xl text-center"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />


        <button
          disabled={!editValue.trim()}
          className="w-40 h-10 border px-3 py-2 rounded-2xl bg-black text-white disabled:opacity-60 relative"
        >
          {EditLoading?<LoadingSpinner/>:"Submit"}

        </button>
        
      </form>
    </Modal>
  );
};

export default EditTitleModal;
