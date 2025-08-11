import { createApiClient } from '../../shared/utils/apiClient';

const districtService = {
  async fetchDistricts() {
    const api = createApiClient('/districts/');
    return await api.get();
  },
};

export default districtService;