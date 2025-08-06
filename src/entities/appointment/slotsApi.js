import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';
import tokenService from '../user/tokenService';

export const fetchAppointmentSlots = async (workplaceId, date) => {
  const accessToken = tokenService.getAccessToken();
  const currentLanguage = localStorage.getItem('app_language') || 'ru';
  setLanguageHeader(currentLanguage);
  
  const response = await httpClient.get(`/workplaces/${workplaceId}/slots/${date}/`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  
  return response.data;
}; 