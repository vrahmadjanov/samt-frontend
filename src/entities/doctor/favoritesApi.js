import { createApiClient } from '../../shared/utils/apiClient';

export const addDoctorToFavorites = async (doctorId) => {
  const api = createApiClient('/patients/favorites/doctors/add/');
  return await api.post({ doctor_id: doctorId });
};

export const removeDoctorFromFavorites = async (doctorId) => {
  const api = createApiClient('/patients/favorites/doctors/add/');
  return await api.delete({ doctor_id: doctorId });
};

export const getFavoriteDoctorsIds = async () => {
  const api = createApiClient('/patients/favorites/doctors/ids/');
  return await api.get();
};