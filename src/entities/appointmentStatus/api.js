import { createApiClient } from '../../shared/utils/apiClient';

const appointmentStatusApi = {
  async fetchAppointmentStatuses() {
    const api = createApiClient('/appointment_statuses/');
    return await api.get();
  },
};

export default appointmentStatusApi; 