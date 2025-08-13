import { createApiClient } from '../../shared/utils/apiClient';

export const fetchClinics = async (page = 1, filters = {}) => {
  const api = createApiClient('/clinics-paginated/');
  const params = { page, ...filters };
  return await api.get(params); // ожидается { count, next, previous, results }
};

export const fetchClinicById = async (id) => {
  const api = createApiClient(`/clinics/${id}/`);
  return await api.get();
};

export const fetchClinicDoctors = async (id) => {
  const api = createApiClient(`/clinics/${id}/doctors/`);
  return await api.get();
};