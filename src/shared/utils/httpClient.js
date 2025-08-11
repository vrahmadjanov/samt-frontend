import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Увеличиваем таймаут до 30 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена авторизации
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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