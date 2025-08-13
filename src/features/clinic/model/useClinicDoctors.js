import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchClinicDoctors } from '../../../entities/clinic/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useClinicDoctors = (clinicId) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const load = useCallback(async () => {
    const requestKey = JSON.stringify({ clinicId, language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClinicDoctors(clinicId);
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [clinicId, language]);

  useEffect(() => {
    if (!clinicId) return;
    load();
  }, [clinicId, load]);

  return { doctors, loading, error, reload: load };
};


