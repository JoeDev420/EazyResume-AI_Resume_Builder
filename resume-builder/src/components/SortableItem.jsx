import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? CSS.Transform.toString(transform)
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      <div
        {...listeners}
        className="absolute -left-5 top-2 opacity-0 group-hover:opacity-100
                   cursor-grab active:cursor-grabbing text-gray-400"
        aria-label="Drag section"
      >
        <GripVertical size={16} />
      </div>

      <div className="pl-2">
        {children}
      </div>
    </div>
  );
};

export default SortableItem;
