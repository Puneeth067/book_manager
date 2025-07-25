import React from 'react';
import Button from '../UI/Button';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          {book.description && (
            <p className="text-gray-500 text-sm line-clamp-3">{book.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-400">
          Added {new Date(book.createdAt).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(book)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(book.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
