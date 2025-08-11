import { createApiClient } from '../../shared/utils/apiClient';

export const fetchRegions = async () => {
  const api = createApiClient('/regions/');
  return await api.get();
};