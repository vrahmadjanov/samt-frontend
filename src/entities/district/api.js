import httpClient from '../../shared/utils/httpClient';

const districtService = {
  async fetchDistricts(language = 'ru') {
    const response = await httpClient.get('/districts/', {
      headers: { 'Accept-Language': language },
    });
    return response.data;
  },
};

export default districtService;