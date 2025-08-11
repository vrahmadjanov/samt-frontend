import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAppointmentSlots } from '../../../entities/appointment/slotsApi';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useAppointmentSlots = (workplaceId, date) => {
  const [slots, setSlots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadSlots = useCallback(async () => {
    const requestKey = JSON.stringify({ workplaceId, date, language });
    if (lastRequestKeyRef.current === requestKey) {
      return;
    }
    lastRequestKeyRef.current = requestKey;
    if (!workplaceId || !date) {
      setSlots(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAppointmentSlots(workplaceId, date);
      setSlots(data);
    } catch (err) {
      setError(err);
      setSlots(null);
    } finally {
      setLoading(false);
    }
  }, [workplaceId, date, language]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots, language]);

  const refreshSlots = useCallback(() => {
    loadSlots();
  }, [loadSlots]);

  return {
    slots,
    loading,
    error,
    refreshSlots,
  };
}; 