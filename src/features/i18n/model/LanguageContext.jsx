import React, { createContext, useState, useEffect } from 'react';
import { DEFAULT_LANGUAGE, isLanguageSupported } from '../../../shared/i18n/i18n';
import { setLanguageHeader } from '../../../shared/utils/httpClient';
import { APP_LANGUAGE_KEY } from '../../../shared/config/keys';

// Создаем контекст
export const LanguageContext = createContext();

// Провайдер контекста
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  // Загружаем язык из localStorage при инициализации
  useEffect(() => {
    const savedLanguage = localStorage.getItem(APP_LANGUAGE_KEY);
    if (savedLanguage && isLanguageSupported(savedLanguage)) {
      setLanguage(savedLanguage);
      setLanguageHeader(savedLanguage);
    }
  }, []);

  // Функция для изменения языка
  const changeLanguage = (newLanguage) => {
    if (isLanguageSupported(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem(APP_LANGUAGE_KEY, newLanguage);
      setLanguageHeader(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 