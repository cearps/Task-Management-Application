import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold">
          &times;
        </button>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
