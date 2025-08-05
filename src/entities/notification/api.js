import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';
import tokenService from '../user/tokenService';

export const fetchNotificationTypes = async () => {
  const accessToken = tokenService.getAccessToken();
  
  // Устанавливаем заголовок языка
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.get('/notification_types/', {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
};

export const fetchNotifications = async (page = 1, filters = {}) => {
  const accessToken = tokenService.getAccessToken();
  
  // Устанавливаем заголовок языка
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  // Формируем URL с параметрами
  const params = new URLSearchParams();
  params.append('page', page);
  // Динамически добавляем все фильтры
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  
  const response = await httpClient.get(`/notifications-paginated/?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data; // предполагается, что data = { count, next, previous, results }
};

export const markNotificationAsRead = async (notificationId) => {
  const accessToken = tokenService.getAccessToken();
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.post(`/notifications/${notificationId}/mark-read/`, {}, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const accessToken = tokenService.getAccessToken();
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.post('/notifications/mark-all-read/', {}, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
}; 