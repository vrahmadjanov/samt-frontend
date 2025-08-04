import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';
import tokenService from '../user/tokenService';

export const fetchAppointments = async (page = 1, filters = {}) => {
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
  
  const response = await httpClient.get(`/appointments/list-paginated/?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data; // предполагается, что data = { count, next, previous, results }
};

export const cancelAppointment = async (appointmentId) => {
  const accessToken = tokenService.getAccessToken();
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.post(`/appointments/${appointmentId}/cancel/`, {}, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
};

export const confirmAppointmentByPatient = async (appointmentId) => {
  const accessToken = tokenService.getAccessToken();
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.post(`/appointments/${appointmentId}/confirm-patient/`, {}, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
};

export const confirmAppointmentByDoctor = async (appointmentId) => {
  const accessToken = tokenService.getAccessToken();
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.post(`/appointments/${appointmentId}/confirm-doctor/`, {}, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
}; 