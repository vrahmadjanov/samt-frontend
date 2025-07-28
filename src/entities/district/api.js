import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';

const districtService = {
  async fetchDistricts() {
    // Устанавливаем заголовок языка
    const currentLanguage = localStorage.getItem('app_language') || 'ru';
    setLanguageHeader(currentLanguage);
    
    const response = await httpClient.get('/districts/');
    return response.data;
  },
};

export default districtService;