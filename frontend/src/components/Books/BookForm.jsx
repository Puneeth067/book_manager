import React, { useState, useEffect } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';

const BookForm = ({ book, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover_image: '',
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        cover_image: book.cover_image || '',
      });
      setImagePreview(book.cover_image || '');
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update image preview for cover_image
    if (name === 'cover_image') {
      setImagePreview(value);
    }

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
    
    // Validate cover_image URL if provided
    if (formData.cover_image && !isValidUrl(formData.cover_image)) {
      newErrors.cover_image = 'Please enter a valid image URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  const handleImageError = () => {
    setImagePreview('');
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

      <Input
        label="🖼️ Cover Image URL"
        type="url"
        name="cover_image"
        value={formData.cover_image}
        onChange={handleChange}
        error={errors.cover_image}
        placeholder="https://example.com/book-cover.jpg (optional)"
      />

      {/* Image Preview */}
      {imagePreview && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            🔍 Cover Preview
          </label>
          <div className="flex justify-center">
            <div className="w-32 h-40 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={imagePreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      )}
      
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