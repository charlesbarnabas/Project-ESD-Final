import PropTypes from "prop-types";

export default function Modal({ isOpen, onClose, children, width = "w-1/2" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white p-10 rounded-lg shadow-lg relative ${width}`}>
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
  width: PropTypes.string,
};
