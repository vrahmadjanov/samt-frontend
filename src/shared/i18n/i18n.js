import ru from './locales/ru.json';
import tg from './locales/tg.json';

// Словари переводов
const translations = {
  ru,
  tg
};

// Функция для получения перевода по ключу
export const t = (key, language = 'ru') => {
  const keys = key.split('.');
  let value = translations[language] || translations.ru;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Если перевод не найден, возвращаем ключ
      return key;
    }
  }
  
  return value || key;
};

// Функция для получения всех переводов для языка
export const getTranslations = (language = 'ru') => {
  return translations[language] || translations.ru;
};

// Поддерживаемые языки
export const SUPPORTED_LANGUAGES = {
  ru: 'Русский',
  tg: 'Тоҷикӣ'
};

// Язык по умолчанию
export const DEFAULT_LANGUAGE = 'ru';

// Проверка поддержки языка
export const isLanguageSupported = (language) => {
  return Object.keys(SUPPORTED_LANGUAGES).includes(language);
}; 