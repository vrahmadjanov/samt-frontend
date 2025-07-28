import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';

const specialtyApi = {
  async fetchSpecialties() {
    // Устанавливаем заголовок языка
    const currentLanguage = localStorage.getItem('app_language') || 'ru';
    setLanguageHeader(currentLanguage);
    
    const response = await httpClient.get('/specialties/');
    return response.data;
  },
};

export default specialtyApi; 