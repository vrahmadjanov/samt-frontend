import { createApiClient } from '../../shared/utils/apiClient';

export const fetchClinicTypes = async () => {
  const api = createApiClient('/clinic_types/');
  return await api.get();
};