import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../components/AxiosConfig";

const saveAllToDb = async(setPreviewLoading,formData,setFormData,resumeId)=>{


  try {


      setPreviewLoading(true)

      await new Promise(r => setTimeout(r, 400)); 

      let response = null

      console.log(resumeId)

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


    export default saveAllToDb