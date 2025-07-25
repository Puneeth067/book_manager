import { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getBooks();
      setBooks(response.data.books);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (bookData) => {
    try {
      const response = await booksAPI.createBook(bookData);
      setBooks(prev => [response.data.book, ...prev]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to create book');
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const response = await booksAPI.updateBook(id, bookData);
      setBooks(prev => prev.map(book => 
        book.id === id ? response.data.book : book
      ));
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to update book');
    }
  };

  const deleteBook = async (id) => {
    try {
      await booksAPI.deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete book');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
  };
};