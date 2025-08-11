import { createApiClient } from '../../shared/utils/apiClient';

const specialtyApi = {
  async fetchSpecialties() {
    const api = createApiClient('/specialties/');
    return await api.get();
  },
};

export default specialtyApi; 