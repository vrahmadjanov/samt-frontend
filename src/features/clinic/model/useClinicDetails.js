import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchClinicById } from '../../../entities/clinic/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useClinicDetails = (id) => {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const load = useCallback(async () => {
    const requestKey = JSON.stringify({ id, language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClinicById(id);
      setClinic(data);
    } catch (err) {
      setError(err);
      setClinic(null);
    } finally {
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    if (!id) return;
    load();
  }, [id, load]);

  return { clinic, loading, error, reload: load };
};


