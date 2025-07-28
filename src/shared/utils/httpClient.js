import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://89.111.172.219/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для установки языка в заголовках
export const setLanguageHeader = (language) => {
  httpClient.defaults.headers.common['Accept-Language'] = language;
};

// Функция для получения текущего языка из localStorage
export const getCurrentLanguage = () => {
  return localStorage.getItem('app_language') || 'ru';
};

// Инициализируем язык по умолчанию
setLanguageHeader(getCurrentLanguage());

// Функция для обновления заголовка языка при изменении
export const updateLanguageHeader = () => {
  const currentLanguage = getCurrentLanguage();
  setLanguageHeader(currentLanguage);
};

export default httpClient;