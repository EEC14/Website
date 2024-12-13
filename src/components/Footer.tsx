import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 py-4 px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center space-y-4 sm:space-y-0">
        <p>© {currentYear} ESB Healthcare Ltd</p>
        <div className="flex items-center space-x-4"> {/* Key change: flex with space-x-4 */}
          <a 
            href="mailto:support@esbhealthcare.com" 
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 
                       bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl
                       hover:from-blue-800 hover:to-blue-700 transition-colors duration-200 shadow-sm"
          >
            Contact support
          </a>
          <a 
            href="https://www.esbhealthcare.com" 
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 
                       bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl
                       hover:from-blue-800 hover:to-blue-700 transition-colors duration-200 shadow-sm"
          >
            Our website
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
