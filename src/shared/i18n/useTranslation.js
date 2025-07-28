import { useContext } from 'react';
import { LanguageContext } from '../../features/i18n/model/LanguageContext';
import { t } from './i18n';

// Хук для использования переводов
export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  const translate = (key) => {
    return t(key, language);
  };
  
  return {
    t: translate,
    language
  };
}; 