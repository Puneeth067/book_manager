import React from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const BookViewModal = ({ book, isOpen, onClose, onEdit, onDelete, maxWidth }) => {
  if (!book) return null;

  const handleEdit = () => {
    onEdit(book);
    onClose();
  };

  const handleDelete = () => {
    onDelete(book.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth={maxWidth}
    >
      <div className="space-y-8">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="w-4 h-16 bg-white bg-opacity-30 rounded-full"></div>
              <div className="text-right opacity-75">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight pr-4">{book.title}</h2>
            <div className="flex items-center space-x-3 text-xl opacity-90">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">by {book.author}</span>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-8 px-2">
          {/* Description */}
          {book.description && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Description</h3>
              </div>
              <div className="ml-14">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base max-w-none break-words">{book.description}</p>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-indigo-200 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h4a1 1 0 011 1v4h3a2 2 0 012 2v1M3 9h18M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Date Added</span>
              </div>
              <p className="text-gray-800 font-semibold text-lg ml-16">
                {new Date(book.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-indigo-200 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Time Ago</span>
              </div>
              <p className="text-gray-800 font-semibold text-lg ml-16">
                {(() => {
                  const now = new Date();
                  const created = new Date(book.createdAt);
                  const diffTime = Math.abs(now - created);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  if (diffDays === 1) return '1 day ago';
                  if (diffDays < 30) return `${diffDays} days ago`;
                  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
                  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
                })()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </Button>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleEdit}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Book
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookViewModal;