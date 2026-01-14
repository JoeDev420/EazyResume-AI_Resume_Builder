import { templates } from "./templates/TemplateRender";


const TemplateDropdown = ({ templateId, onChange }) => {

  return (
    <div className="relative">

      <button
        className="bg-slate-700 text-white px-5 py-2 rounded"
        onClick={onChange.toggle}
      >
        Select Template
      </button>

      {onChange.open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border shadow-md rounded z-10">

          {templates.map((t) => (

            <button
              key={t.id}
              onClick={() => onChange.select(t.id)}
              className={`w-full px-4 py-2 text-left hover:bg-blue-100 
                ${templateId === t.id ? "bg-blue-200" : ""}
              `}
            >
              {t.name}
            </button>

          ))}

        </div>
      )}

    </div>
  );
};

export default TemplateDropdown;