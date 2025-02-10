import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#0B2545] text-[#EEF4ED] p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-[#EEF4ED] hover:text-gray-300">
            <FiX size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;