import React from 'react';
import { LINKS } from '../utils/constants';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-2 shadow-md border-b-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start">
          <img src="/logo.png" alt="Logo" className="h-7 w-7" />
          <h1 className="text-lg font-semibold text-gray-700 ml-0 hidden md:block">
            HOME TASK REONIC
          </h1>
        </div>
        <a
          href={LINKS.GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
          title={'GITHUB'}
        >
          <img
            src={LINKS.GITHUB_PROFILE_PICTURE}
            alt="GitHub Profile"
            className="h-8 w-8 rounded-full"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
