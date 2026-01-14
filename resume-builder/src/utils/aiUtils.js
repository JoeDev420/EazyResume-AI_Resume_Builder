import API from "../components/axios"



export const buildRedirectUri = ( resumeId, resumeStep) =>
  `/Premium?redirect=/app/builder/${resumeId}?resumeStep=${resumeStep}`;

export const enhanceAi = async (
  data,
  key,
  setDraft,
  setFormData,
  setAiLoading,
) => {
  try {

    
    setAiLoading(true)


    //first just take the data, get modified data back then handle draft case or formData case
    const response = await API.post("ai/enhanceAi", {data})

    const improvedData = response.data.improvedData

  if(setDraft){

    setDraft(prev=>({...prev,[key]:improvedData}))
  }
  
  else{

    setFormData(prev=>({...prev,[key]:improvedData}))

  }

    setAiLoading(false)

  } catch (error) {
    setAiLoading(false)
    console.log("FULL ERROR:", error);

if (error.response) {
  console.log("STATUS:", error.response.status);
  console.log("DATA:", error.response.data);
  console.log("HEADERS:", error.response.headers);
} else if (error.request) {
  console.log("NO RESPONSE RECEIVED:", error.request);
} else {
  console.log("ERROR SETUP ISSUE:", error.message);
}
  }
}
