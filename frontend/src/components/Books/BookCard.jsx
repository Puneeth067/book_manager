import React from 'react';
import Button from '../UI/Button';

const BookCard = ({ book, onEdit, onDelete, onView }) => {
  return (
    <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 min-h-0 overflow-hidden px-4 py-6 flex flex-col justify-between relative">
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-0">
          <div className="flex items-start mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3 opacity-80 flex-shrink-0 mt-1"></div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-200 break-words leading-tight">{book.title}</h3>
          </div>
          <div className="flex items-start mb-3">
            <svg className="w-4 h-4 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-indigo-600 font-medium break-words">{book.author}</p>
          </div>
          {book.description && (
            <div className="mb-2">
              <p className="text-gray-600 text-sm leading-relaxed break-words overflow-hidden" 
                 style={{
                   display: '-webkit-box',
                   WebkitLineClamp: 3,
                   WebkitBoxOrient: 'vertical',
                   wordBreak: 'break-word',
                   overflowWrap: 'break-word'
                 }}>
                {book.description}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">Added {new Date(book.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onView(book)}
            >
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(book)}
            >
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(book.id)}
            >
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;