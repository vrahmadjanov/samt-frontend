import { createApiClient } from '../../shared/utils/apiClient';

const experienceApi = {
  async fetchExperienceLevels() {
    const api = createApiClient('/experience_levels/');
    return await api.get();
  },
};

export default experienceApi; 