import React from 'react';

// Mock components for demonstration
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

const Button = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    secondary: 'bg-white text-indigo-600 hover:bg-gray-50'
  };
  const sizes = {
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const Home = () => {
  // Mock user state - set to null to show non-authenticated state
  const user = null;

  return (
    <div className="text-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight">
            Organize Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 animate-gradient-x"> 
              Book Collection
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Keep track of your favorite books, discover new reads, and manage your personal library 
            with our beautifully intuitive book management system.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 animate-fade-in-up animation-delay-200">
          {user ? (
            <Link to="/dashboard" className="transform hover:scale-105 transition-all duration-300">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth" className="transform hover:scale-105 transition-all duration-300">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl">
                  Get Started!
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 mx-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up animation-delay-400">
            <h2 className="text-4xl font-bold text-slate-800 mb-16">
              Everything you need to manage your books
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Easy Organization",
                description: "Add, edit, and organize your books with our simple and intuitive interface.",
                gradient: "from-emerald-400 to-cyan-400",
                bgGradient: "from-emerald-50 to-cyan-50"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Quick Search",
                description: "Find any book in your collection instantly with our powerful search functionality.",
                gradient: "from-purple-400 to-pink-400",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Secure & Private",
                description: "Your book collection is securely stored and only accessible by you.",
                gradient: "from-orange-400 to-red-400",
                bgGradient: "from-orange-50 to-red-50"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border border-white/50 backdrop-blur-sm`}
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-20 px-6 animate-fade-in-up animation-delay-1200">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-blue-600/20 animate-pulse"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
                <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                  Join thousands of book lovers who trust us with their collections.
                </p>
                <Link to="/auth" className="inline-block transform hover:scale-105 transition-all duration-300">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl hover:shadow-2xl font-semibold px-8 py-4"
                  >
                    Create Your Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientX {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradientX 4s ease infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-1200 {
          animation-delay: 1200ms;
        }
      `}</style>
    </div>
  );
};

export default Home;