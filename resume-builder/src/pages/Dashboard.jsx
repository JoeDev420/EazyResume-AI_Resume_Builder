  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { PlusIcon, UploadCloudIcon } from "lucide-react";
  import ResumeCard from "../components/ResumeCard";
  import CreateResumeModal from "../components/Modals/CreateResume";
  import UploadResumeModal from "../components/Modals/UploadResume";
  import EditTitleModal from "../components/Modals/EditTitle";
  import DeleteConfirmModal from "../components/Modals/DeleteResume";


  import API from "../components/AxiosConfig";
  import { useAuth } from "../components/AuthContext";

  const Dashboard = () => {

    const {user} = useAuth()

    // --------------------------------
    // Navigation
    // --------------------------------
    const navigate = useNavigate();

    // --------------------------------
    // State (STANDARDIZED)
    // --------------------------------

    const [selectedId, setSelectedId] = useState(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [editValue, setEditValue] = useState("");
    const [uploadFile, setUploadFile] = useState(null);

    const [createValue, setCreateValue] = useState("");


    const [resumes, setResumes] = useState( [] );

    // --------------------------------
    // Effects
    // --------------------------------


    const getResumes = async ()=>{

          try {
            
          
                const response = await API.get(`/resume/resumeGetAll`)
        
                setResumes(response.data.resumes)
        
              } catch (error) {
                
                console.log(error.message)
        
              }
        
            }

    useEffect(() => {
      
            getResumes()


    }, []);

    // --------------------------------
    // Modal close helpers
    // --------------------------------

    const closeCreate = () => {
      setCreateOpen(false);
      setCreateValue("");
    };


    const closeEdit = () => {
      setEditOpen(false);
      setEditValue("");
    };

    const closeDelete = () => {
      setDeleteOpen(false);
      setEditValue("");
      setSelectedId(null);
    };

    const closeUpload = () => {
      setUploadOpen(false);
      setUploadFile(null);
    };

    // --------------------------------
    // Handlers
    // --------------------------------

   
    
    // --------------------------------
    // JSX
    // --------------------------------

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="text-2xl font-medium mb-6 sm:hidden">
          Welcome, Joe Doe
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => setCreateOpen(true)}
            className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center gap-2
                      border border-dashed rounded-lg text-slate-600
                      hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <PlusIcon className="size-11 p-2.5 bg-blue-400 text-white rounded-full" />
            <p>Create Resume</p>
          </button>

          <button
            onClick={() => setUploadOpen(true)}
            className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center gap-2
                      border border-dashed rounded-lg text-slate-600
                      hover:border-red-500 hover:shadow-lg transition-all"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-red-400 text-white rounded-full" />
            <p>Upload Existing</p>
          </button>

        </div>

        {!!resumes.length && (
          <>
            <div className="mt-10 text-xl">Existing Resumes</div>

            <div className="flex gap-10 mt-10 pl-5">

              {resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onOpen={() =>
                    navigate(`/app/builder/${resume._id}?resumeStep=1`)
                  }
                  onEdit={() => {
                    setSelectedId(resume._id);
                    setEditValue(resume.title);
                    setEditOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedId(resume._id);
                    setEditValue(resume.title);
                    setDeleteOpen(true);
                  }}
                />
              ))}

            </div>
          </>
        )}


        <CreateResumeModal
          open={createOpen}   //needed for modal component
          onClose={closeCreate}  //needed for modal component
          createValue={createValue}
          setCreateValue={setCreateValue}
          
        />

        <UploadResumeModal
          open={uploadOpen}
          onClose = {closeUpload}
          uploadFile={uploadFile}
          setUploadFile = {setUploadFile}
          
          
        />

        <EditTitleModal
          open={editOpen}
          onClose={closeEdit}
          editValue={editValue}
          setEditValue={setEditValue}
          selectedId={selectedId}
          setResumes={setResumes}
        />

        <DeleteConfirmModal
          open={deleteOpen}
          onClose={closeDelete}
          editValue={editValue}
          selectedId={selectedId}
          setResumes={setResumes}
          resumes={resumes}
        />

      </div>
    );
  };

  export default Dashboard;
