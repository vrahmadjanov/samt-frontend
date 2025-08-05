import appointmentStatusApi from './api';

function mapAppointmentStatuses(data) {
  return data.map(status => ({
    id: status.id,
    name: status.name,
  }));
}

const appointmentStatusService = {
  async getAppointmentStatuses() {
    const data = await appointmentStatusApi.fetchAppointmentStatuses();
    return mapAppointmentStatuses(data);
  },
};

export default appointmentStatusService; 