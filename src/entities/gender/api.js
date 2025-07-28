import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';

const genderService = {
  async fetchGenders() {
    // Устанавливаем заголовок языка
    const currentLanguage = localStorage.getItem('app_language') || 'ru';
    setLanguageHeader(currentLanguage);
    
    const response = await httpClient.get('/genders/');
    return response.data;
  },
};

export default genderService;
