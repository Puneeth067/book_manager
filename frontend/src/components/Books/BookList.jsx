import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onEdit, onDelete, onView, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto h-32 w-32 text-gray-300 mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50"></div>
          <svg className="relative z-10 w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No books yet</h3>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          Start building your personal library by adding your first book. Every great collection begins with a single book! 📚
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <div 
          key={book.id} 
          className="animate-in slide-in-from-bottom-4 fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <BookCard
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </div>
      ))}
    </div>
  );
};

export default BookList;