import React, { useState } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const BookViewModal = ({ book, isOpen, onClose, onEdit, onDelete, maxWidth }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!book) return null;

  const handleEdit = () => {
    onEdit(book);
    onClose();
  };

  const handleDelete = () => {
    onDelete(book.id);
    onClose();
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const defaultCoverImage = 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=No+Cover';
  const coverImageSrc = imageError ? defaultCoverImage : (book.cover_image || defaultCoverImage);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth={maxWidth}
    >
      <div className="space-y-8">
        {/* Header Section with Cover Image and Basic Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-80 mx-auto md:mx-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl overflow-hidden shadow-2xl">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                  <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <img
                src={coverImageSrc}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl"></div>
            </div>
          </div>

          {/* Book Info */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {book.title}
                </h2>
                <div className="flex items-center space-x-3 text-xl text-gray-600">
                  <svg className="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-semibold">by {book.author}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h4a1 1 0 011 1v4h3a2 2 0 012 2v1M3 9h18M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Added</p>
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(book.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time Ago</p>
                      <p className="text-lg font-bold text-gray-900">
                        {(() => {
                          const now = new Date();
                          const created = new Date(book.createdAt);
                          const diffTime = Math.abs(now - created);
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          
                          if (diffDays === 1) return '1 day';
                          if (diffDays < 30) return `${diffDays} days`;
                          if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''}`;
                          return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {book.description && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Description</h3>
            </div>
            <div className="ml-16">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg max-w-none break-words">
                {book.description}
              </p>
            </div>
          </div>
        )}

        {/* Cover Image Info Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Cover Image</h3>
          </div>
          <div className="ml-16 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider w-20">Source:</span>
              <div className="flex-1">
                {book.cover_image ? (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <a 
                      href={book.cover_image} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all text-sm font-mono"
                    >
                      {book.cover_image}
                    </a>
                  </div>
                ) : (
                  <span className="text-gray-500 italic">Default placeholder image</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider w-20">Status:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${imageError ? 'bg-red-400' : 'bg-green-400'}`}></div>
                <span className={`text-sm font-medium ${imageError ? 'text-red-600' : 'text-green-600'}`}>
                  {imageError ? 'Using fallback image' : 'Image loaded successfully'}
                </span>
              </div>
            </div>
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
    </Modal>
  );
};

export default BookViewModal;