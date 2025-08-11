import { createApiClient } from '../../shared/utils/apiClient';

export const fetchAppointmentSlots = async (workplaceId, date) => {
  const api = createApiClient(`/workplaces/${workplaceId}/slots/${date}/`);
  return await api.get();
};