import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // Dynamically change language
  };

  return (
    <div className="relative">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={i18n.language}
        className="appearance-none bg-transparent text-lg cursor-pointer outline-none"
      >
        <option value="en">🇬🇧</option>
        <option value="de">🇩🇪</option>
        <option value="it">🇮🇹</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
