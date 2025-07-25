import React, { useState, useEffect } from 'react';

const SearchBar = ({ books, onFilteredBooks, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'title', 'author'

  useEffect(() => {
    const filtered = books.filter(book => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return true;

      switch (activeFilter) {
        case 'title':
          return book.title.toLowerCase().includes(term);
        case 'author':
          return book.author.toLowerCase().includes(term);
        default:
          return book.title.toLowerCase().includes(term) || 
                 book.author.toLowerCase().includes(term);
      }
    });
    onFilteredBooks(filtered);
  }, [searchTerm, activeFilter, books, onFilteredBooks]);

  const clearSearch = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  const filterOptions = [
    { value: 'all', label: 'All', icon: '🔍' },
    { value: 'title', label: 'Title', icon: '📚' },
    { value: 'author', label: 'Author', icon: '✍️' }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your books..."
            className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 hover:border-gray-300 focus:outline-none focus:ring-0 transition-all duration-200 placeholder-gray-400 text-gray-800 font-medium bg-white"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === option.value
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Found {books.filter(book => {
                  const term = searchTerm.toLowerCase().trim();
                  switch (activeFilter) {
                    case 'title':
                      return book.title.toLowerCase().includes(term);
                    case 'author':
                      return book.author.toLowerCase().includes(term);
                    default:
                      return book.title.toLowerCase().includes(term) || 
                             book.author.toLowerCase().includes(term);
                  }
                }).length} book{books.filter(book => {
                  const term = searchTerm.toLowerCase().trim();
                  switch (activeFilter) {
                    case 'title':
                      return book.title.toLowerCase().includes(term);
                    case 'author':
                      return book.author.toLowerCase().includes(term);
                    default:
                      return book.title.toLowerCase().includes(term) || 
                             book.author.toLowerCase().includes(term);
                  }
                }).length !== 1 ? 's' : ''}
              </span>
            </div>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1"
              >
                <span>Clear</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;