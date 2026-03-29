import { LanguageContext } from '../context/languageContext';
import { useState } from 'react';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
