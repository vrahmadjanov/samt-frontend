import { useEffect, useState } from 'react';
import appointmentStatusService from '../../../entities/appointmentStatus/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useAppointmentStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadStatuses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await appointmentStatusService.getAppointmentStatuses();
      setStatuses(data);
    } catch (err) {
      setError(err);
      setStatuses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatuses();
  }, [language]);

  return { statuses, loading, error, loadStatuses };
}; 