import httpClient, { setLanguageHeader } from '../../shared/utils/httpClient';

const appointmentStatusApi = {
  async fetchAppointmentStatuses() {
    // Устанавливаем заголовок языка
    const currentLanguage = localStorage.getItem('app_language') || 'ru';
    setLanguageHeader(currentLanguage);
    
    const response = await httpClient.get('/appointment_statuses/');
    return response.data;
  },
};

export default appointmentStatusApi; 