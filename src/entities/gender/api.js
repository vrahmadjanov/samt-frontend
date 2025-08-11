import { createApiClient } from '../../shared/utils/apiClient';

const genderService = {
  async fetchGenders() {
    const api = createApiClient('/genders/');
    return await api.get();
  },
};

export default genderService;
