import { createApiClient } from '../../shared/utils/apiClient';

export const fetchDoctors = async (page = 1, filters = {}) => {
  const api = createApiClient('/doctors/list-paginated/');
  const params = { page, ...filters };
  return await api.get(params); // ожидается { count, next, previous, results }
};

export const fetchDoctorById = async (doctorId) => {
  const api = createApiClient(`/doctors/${doctorId}/`);
  return await api.get();
}; 