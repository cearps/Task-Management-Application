import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2E2236] rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 relative"> {/* Updated background color */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white hover:text-gray-400 font-bold"> {/* Adjusted button color */}
          &times;
        </button>
        <div className="p-4 text-black"> {/* Updated text color */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
