import React, { useState, useEffect } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';

const BookForm = ({ book, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="📚 Book Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Enter book title"
      />
      
      <Input
        label="✍️ Author"
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        error={errors.author}
        placeholder="Enter author name"
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          📝 Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 hover:border-gray-300 focus:outline-none focus:ring-0 transition-all duration-200 resize-none placeholder-gray-400 text-gray-800 font-medium bg-white"
          placeholder="Enter book description (optional)"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {book ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Update Book
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Book
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;