import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';
import tokenService from '../user/tokenService';

export const fetchClinics = async (page = 1, filters = {}) => {
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
  
  const response = await httpClient.get(`/clinics-paginated/?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data; // предполагается, что data = { count, next, previous, results }
}; 