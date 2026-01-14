import React, { useEffect } from 'react'
import API from './AxiosConfig';
import { useParams,useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResumeNavigator = ({miniForm,setResumeStep,resumeStep,setPreviewLoading,formData,setFormData}) => {


const {resumeId} = useParams()

const [searchParams,setSearchParams] = useSearchParams()



const saveToDb = async()=>{  //next button save
  
  try {


      setPreviewLoading(true)

      await new Promise(r => setTimeout(r, 200)); 
      
      const response = await API.put("/resume/update",{...miniForm||formData,resumeId,resumeStep})  //step is required to 
                                                                                          //know which schema to use           

      toast.success("Saved")

      setPreviewLoading(false)

      const newResumeStep = resumeStep+1

      setResumeStep(prev => {

        const next = prev + 1;

        setSearchParams(params => {
          const p = new URLSearchParams(params);
          p.set("resumeStep", next);
          return p;
        });

        return next;
        
      });

      

  } 

  catch (error) {

  setPreviewLoading(false)
      
  toast.error(error.response.data.message)
  


  }



}

const saveAllToDb = async()=>{
  

  try {


      setPreviewLoading(true)

      await new Promise(r => setTimeout(r, 400)); 

      let response = null

      response = await API.put("/resume/updateAll",{...formData,resumeId})        
    
      toast.success("Saved")

      setPreviewLoading(false)

      setFormData(prev=>({...prev,change:false}))
      

      
  } 

    catch (error) {

    setPreviewLoading(false)
        
    toast.error(error.response.data.message)
    


    }



    }

useEffect(() => {
}, [formData.change]);



  //everytime you click on next, only the current form's content is being saved on the db

  return (

      <div className='flex flex-col gap-5 relative'>

        <div className="flex justify-between items-center pl-10 pr-10 pb-5">

          <button
              disabled={resumeStep === 1}
              onClick={() => { const newResumeStep = resumeStep-1;
                
                            setResumeStep(prev => prev - 1)

                            setSearchParams(params => {
                            const p = new URLSearchParams(params);
                            p.set("resumeStep",newResumeStep);
                            return p;
                            
            })

              }}
              className={`px-4 py-1 rounded ${
                resumeStep === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Back
            </button>
          

          <button
            type="button"
              onClick={ () => {saveToDb()

            }}
            
            disabled={resumeStep===9}
            className= {`${resumeStep!=9?"bg-blue-500 text-white":"bg-gray-300 cursor-not-allowed"} px-4 py-1 rounded`}
          >
           Next
          </button>

        </div>

        <hr/>

        <div className='saveAll absolute -top-28 -right-205 z-10 '>
          <button
              disabled={!(formData.change)}
              onClick={() => saveAllToDb()

                

              }
              className={`px-2 py-1 rounded ${
                !(formData.change)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
            >
              Save Changes
            </button>
        </div>

      </div>


  )
}

export default ResumeNavigator