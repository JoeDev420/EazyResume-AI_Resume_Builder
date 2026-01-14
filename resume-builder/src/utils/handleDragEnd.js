import API from "../components/axios";

export const handleDragEnd = async (
  event,
  sectionOrder,
  resumeStep,
  formData,
  setFormData
) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const oldIndex = sectionOrder.indexOf(active.id);
  const newIndex = sectionOrder.indexOf(over.id);

  const next = [...sectionOrder];
  const [moved] = next.splice(oldIndex, 1);
  next.splice(newIndex, 0, moved);

  // 1️⃣ update UI immediately
  setFormData(prev=>({...prev,sectionOrder:next}))

  // 2️⃣ persist (side effect)
  try {
    await API.put("/resume/update", {
      resumeStep,
      resumeId: formData._id,
      sectionOrder: next
    });
  } catch (err) {
    console.error(err.message);
  }
};
