import { createApiClient } from '../../shared/utils/apiClient';

export const fetchAppointments = async (page = 1, filters = {}) => {
  const api = createApiClient('/appointments/list-paginated/');
  const params = { page, ...filters };
  return await api.get(params); // ожидается { count, next, previous, results }
};

export const cancelAppointment = async (appointmentId) => {
  const api = createApiClient(`/appointments/${appointmentId}/cancel/`);
  return await api.post({});
};

export const confirmAppointmentByPatient = async (appointmentId) => {
  const api = createApiClient(`/appointments/${appointmentId}/confirm-patient/`);
  return await api.post({});
};

export const confirmAppointmentByDoctor = async (appointmentId) => {
  const api = createApiClient(`/appointments/${appointmentId}/confirm-doctor/`);
  return await api.post({});
};