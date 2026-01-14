import { useState } from "react";
import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";
import API from "../axios";
import { toast } from "react-toastify";

const DeleteConfirmModal = ({
  open,
  onClose,
  editValue,
  selectedId,
  setResumes,
  resumes
}) => {


  const [deleteLoading,setDeleteLoading] = useState(false)


  const deleteHandler = async (e) => {
        
        try {

        setDeleteLoading(true)
        
        const response = await API.delete(`/resume/delete/${selectedId}`)

        toast.success("Resume Deleted")
  
        setResumes(prev=>resumes.filter((resume)=>resume._id!=selectedId))

        setDeleteLoading(false)
  
        onClose()
  
  
         } catch (error) {

          setDeleteLoading(false)
  
          toast.error(error.message)
          
          
        }
      };
  


  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-between h-full p-4">

        <p className="text-2xl">Delete</p>
        <p className="text-xl">{editValue} ?</p>


      {deleteLoading?<div className="w-40 h-10 relative"><LoadingSpinner/></div>:
      <div className="flex gap-10">
          <button
            onClick={deleteHandler}
            className="bg-green-500 w-20 rounded"
          >
            Yes
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 w-20 rounded"
          >
            No
          </button>
        </div>
}

        
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
