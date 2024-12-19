import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-2 shadow-md border-b-2">
      <div className="flex justify-between items-center">
        {/* Logo and Text */}
        <div className="flex items-center justify-start">
          <img src="/logo.png" alt="Logo" className="h-7 w-7" />
          <h1 className="text-lg font-semibold text-gray-700 ml-0 hidden md:block">
            REONIC SIMULATION TEST
          </h1>
        </div>

        {/* GitHub Link with Profile Image */}
        <a
          href="https://github.com/matteobu/reonic"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <img
            src="https://avatars.githubusercontent.com/u/62759388?v=4"
            alt="GitHub Profile"
            className="h-8 w-8 rounded-full"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
