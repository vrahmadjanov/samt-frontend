import httpClient from '../../shared/utils/httpClient';

const specialtyApi = {
  async fetchSpecialties() {
    const response = await httpClient.get('/specialties/');
    return response.data;
  },
};

export default specialtyApi; 