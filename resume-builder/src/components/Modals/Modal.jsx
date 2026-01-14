const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="flex items-center justify-center fixed inset-0 backdrop-blur-sm z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-200 mx-auto h-50 w-100 border-2 border-black rounded-2xl"
      >
        {children}

        <button
          className="absolute right-4 top-0"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
