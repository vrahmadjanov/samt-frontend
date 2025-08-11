import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { APP_LANGUAGE_KEY } from '../config/keys';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Увеличиваем таймаут до 30 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

// Примечание: авторизационный заголовок добавляется в перехватчиках
// setupAuthInterceptors() из entities/user/api.js, чтобы использовать
// единый источник токенов (tokenService) и корректно обрабатывать refresh.

// Интерцептор для обработки ответов
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('HTTP Client Error:', error);
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server may be slow or unavailable');
    }
    return Promise.reject(error);
  }
);

// Функция для установки языка в заголовках
export const setLanguageHeader = (language) => {
  httpClient.defaults.headers.common['Accept-Language'] = language;
};

// Функция для получения текущего языка из localStorage
export const getCurrentLanguage = () => {
  return localStorage.getItem(APP_LANGUAGE_KEY) || 'ru';
};

// Инициализируем язык по умолчанию
setLanguageHeader(getCurrentLanguage());

// Функция для обновления заголовка языка при изменении
export const updateLanguageHeader = () => {
  const currentLanguage = getCurrentLanguage();
  setLanguageHeader(currentLanguage);
};

export default httpClient;