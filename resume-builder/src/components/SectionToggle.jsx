import API from "./AxiosConfig";


const SectionToggles = ({ sectionVisibility,setFormData,resumeId,resumeStep}) => {



  return (
    <div className="flex flex-col gap-2 text-sm">
      <h3 className="font-semibold mb-2">Resume Sections</h3>

      {Object.keys(sectionVisibility).map((key) => (
        <label
          key={key}
          className="flex gap-2 items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={sectionVisibility[key]}
            onChange={async () =>{

              try {
              
              //first modify the object and setFormData

              const newSectionVisibility = {...sectionVisibility, [key]:!sectionVisibility[key]}

              setFormData((prev) => ({
                ...prev,
                sectionVisibility:newSectionVisibility
              }))

              //then send the updated object to DB [DONT SEND STATE ITS NOT UPDATED YET]

              const response = API.put("/resume/update",{resumeStep,resumeId,sectionVisibility:newSectionVisibility})


              } catch (error) {

                console.log(error.message)
                
              }


            }

          }
          />

          <span className="capitalize">
            {key}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SectionToggles;
