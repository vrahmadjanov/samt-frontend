import httpClient from '../../shared/utils/httpClient';

const experienceApi = {
  async fetchExperienceLevels() {
    const response = await httpClient.get('/experience_levels/');
    return response.data;
  },
};

export default experienceApi; 