import React from 'react';
import { LINKS } from '../utils/constants';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './main/languageSelector';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white px-4 py-2 shadow-md border-b-2">
      <div className="flex justify-between items-center">
        <a
          href="https://reonic.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center justify-start">
            <img src="/logo.png" alt="Logo" className="h-7 w-7" />
            <h1 className="text-lg font-semibold text-gray-700 ml-2 hidden md:block">
              {t('header.title')}
            </h1>
          </div>
        </a>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <a
            href={LINKS.GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
            title={t('header.githubLinkTooltip')}
          >
            <img
              src={LINKS.GITHUB_PROFILE_PICTURE}
              alt="GitHub Profile"
              className="h-8 w-8 rounded-full"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
