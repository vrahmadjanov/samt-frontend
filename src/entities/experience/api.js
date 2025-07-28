import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';

const experienceApi = {
  async fetchExperienceLevels() {
    // Устанавливаем заголовок языка
    const currentLanguage = localStorage.getItem('app_language') || 'ru';
    setLanguageHeader(currentLanguage);
    
    const response = await httpClient.get('/experience_levels/');
    return response.data;
  },
};

export default experienceApi; 