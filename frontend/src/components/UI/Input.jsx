import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
          focus:outline-none focus:ring-0
          ${error 
            ? 'border-red-300 focus:border-red-500 bg-red-50' 
            : 'border-gray-200 focus:border-indigo-500 hover:border-gray-300 bg-white'
          }
          placeholder-gray-400 text-gray-800 font-medium
          ${className}
        `}
        {...props}
      />
      {error && (
        <div className="flex items-center mt-1">
          <svg className="w-4 h-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;