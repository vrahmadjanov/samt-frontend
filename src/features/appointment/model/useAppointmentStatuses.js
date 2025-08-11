import { useEffect, useRef, useState, useCallback } from 'react';
import appointmentStatusService from '../../../entities/appointmentStatus/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useAppointmentStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadStatuses = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
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
  }, [language]);

  useEffect(() => {
    loadStatuses();
  }, [loadStatuses]);

  return { statuses, loading, error, loadStatuses };
}; 