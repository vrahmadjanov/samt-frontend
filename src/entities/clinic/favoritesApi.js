import { createApiClient } from '../../shared/utils/apiClient';

export const addClinicToFavorites = async (clinicId) => {
  const api = createApiClient('/patients/favorites/clinics/add/');
  return await api.post({ clinic_id: clinicId });
};

export const removeClinicFromFavorites = async (clinicId) => {
  const api = createApiClient('/patients/favorites/clinics/add/');
  return await api.delete({ clinic_id: clinicId });
};

export const getFavoriteClinicsIds = async () => {
  const api = createApiClient('/patients/favorites/clinics/ids/');
  return await api.get();
};