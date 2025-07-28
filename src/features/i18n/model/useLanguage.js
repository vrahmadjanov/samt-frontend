import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../../shared/i18n/i18n';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  const { language, changeLanguage } = context;
  
  const getLanguageName = (langCode) => {
    return SUPPORTED_LANGUAGES[langCode] || langCode;
  };
  
  const getCurrentLanguageName = () => {
    return getLanguageName(language);
  };
  
  return {
    language,
    changeLanguage,
    getLanguageName,
    getCurrentLanguageName,
    supportedLanguages: Object.keys(SUPPORTED_LANGUAGES)
  };
}; 