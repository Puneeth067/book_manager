import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/UI/Button';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Organize Your
          <span className="text-primary-600"> Book Collection</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Keep track of your favorite books, discover new reads, and manage your personal library 
          with our intuitive book management system.
        </p>
        
        <div className="flex justify-center space-x-4">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white rounded-xl shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Everything you need to manage your books
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Organization</h3>
              <p className="text-gray-600">
                Add, edit, and organize your books with our simple and intuitive interface.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Search</h3>
              <p className="text-gray-600">
                Find any book in your collection instantly with our powerful search functionality.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your book collection is securely stored and only accessible by you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-16">
          <div className="bg-primary-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-primary-100 mb-6">
              Join thousands of book lovers who trust us with their collections.
            </p>
            <Link to="/auth">
              <Button variant="secondary" size="lg">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;