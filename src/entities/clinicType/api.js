import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';
import tokenService from '../user/tokenService';

export const fetchClinicTypes = async () => {
  const accessToken = tokenService.getAccessToken();
  
  // Устанавливаем заголовок языка
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.get('/clinic_types/', {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
}; 