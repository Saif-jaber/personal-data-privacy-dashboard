import "../components/Css/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // don’t render anything if closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
