import httpClient from '../../shared/utils/httpClient';

const genderService = {
  async fetchGenders(language = 'ru') {
    const response = await httpClient.get('/genders/', {
      headers: { 'Accept-Language': language },
    });
    return response.data;
  },
};

export default genderService;
