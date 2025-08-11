import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchClinicTypes } from '../../../entities/clinicType/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useClinicTypes = () => {
  const [clinicTypes, setClinicTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadClinicTypes = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClinicTypes();
      setClinicTypes(data);
    } catch (err) {
      setError(err);
      setClinicTypes([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Загружаем типы клиник при изменении языка
  useEffect(() => {
    loadClinicTypes();
  }, [loadClinicTypes]);

  return { clinicTypes, loading, error, reload: loadClinicTypes };
}; 