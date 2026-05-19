import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableEntry = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group flex items-start gap-1">
      <div
        {...attributes}
        {...listeners}
        className="mt-[3px] opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 shrink-0"
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </div>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
};

export default SortableEntry;
