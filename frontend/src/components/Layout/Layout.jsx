import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-200/25 to-indigo-200/25 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </div>
  );
};

export default Layout;