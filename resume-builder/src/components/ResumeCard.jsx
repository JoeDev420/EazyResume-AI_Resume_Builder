import { Pencil, Trash2 } from "lucide-react";

const ResumeCard = ({ resume, onEdit, onDelete, onOpen }) => {
  return (
    <div className="relative">

      <button
          className="border-2 border-black w-30 h-35 rounded-2xl hover:bg-blue-200
                    px-2 text-center break-words overflow-hidden"
          onClick={onOpen}
        >
          {resume.title}
      </button>



      <button
        onClick={onEdit}
        className="absolute top-0 right-7 p-1"
      >
        <Pencil className="size-4 text-red-400 hover:text-red-500 hover:scale-105" />
      </button>

      <button
        onClick={onDelete}
        className="absolute top-0 right-1 p-1"
      >
        <Trash2 className="size-4 text-red-400 hover:text-red-500 hover:scale-105" />
      </button>


      {resume.public&& <span className="flex items-center gap-1 absolute -top-5 -right-5">

        <div className="w-2 h-2 rounded-full bg-green-300"></div>
        <span className="text-sm text-green-700">Live</span>

      </span>}

    </div>
  );
};

export default ResumeCard;
