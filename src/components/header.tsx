import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-2 shadow-md border-b-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start">
          <img src="/logo.png" alt="Logo" className="h-7 w-7" />
          <h1 className="text-lg font-semibold text-gray-700 ml-0">
            REONIC SIMULATION TEST
          </h1>
        </div>
        <a
          href="https://github.com/matteobu/reonic"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-500 hover:underline"
        >
          github.com/matteobu/reonic
        </a>
      </div>
    </header>
  );
};

export default Header;
