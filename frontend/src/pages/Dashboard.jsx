import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks';
import BookList from '../components/Books/BookList';
import BookForm from '../components/Books/BookForm';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const { books, loading, createBook, updateBook, deleteBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleAddBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(bookId);
      } catch (error) {
        alert('Failed to delete book: ' + error.message);
      }
    }
  };

  const handleSubmitBook = async (bookData) => {
    try {
      setFormLoading(true);
      
      if (editingBook) {
        await updateBook(editingBook.id, bookData);
      } else {
        await createBook(bookData);
      }
      
      setIsModalOpen(false);
      setEditingBook(null);
    } catch (error) {
      alert('Failed to save book: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user?.fullname}! You have {books.length} book{books.length !== 1 ? 's' : ''} in your collection.
          </p>
        </div>
        <Button onClick={handleAddBook}>
          Add New Book
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Books</p>
              <p className="text-2xl font-semibold text-gray-900">{books.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Authors</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(books.map(book => book.author)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {books.filter(book => {
                  const bookDate = new Date(book.createdAt);
                  const now = new Date();
                  return bookDate.getMonth() === now.getMonth() && 
                         bookDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <BookList
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
            loading={loading}
          />
        </div>
      </div>

      {/* Add/Edit Book Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBook ? 'Edit Book' : 'Add New Book'}
      >
        <BookForm
          book={editingBook}
          onSubmit={handleSubmitBook}
          onCancel={handleCloseModal}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;