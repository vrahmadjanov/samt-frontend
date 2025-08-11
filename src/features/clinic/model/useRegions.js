import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchRegions } from '../../../entities/region/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useRegions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadRegions = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRegions();
      setRegions(data);
    } catch (err) {
      setError(err);
      setRegions([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Загружаем регионы при изменении языка
  useEffect(() => {
    loadRegions();
  }, [loadRegions]);

  return { regions, loading, error, reload: loadRegions };
}; 