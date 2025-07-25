import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-md p-0 my-8 overflow-hidden text-left align-middle transition-all duration-300 transform bg-white shadow-2xl rounded-2xl animate-in slide-in-from-bottom-4 fade-in">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 bg-gradient-to-br from-white to-gray-50">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;