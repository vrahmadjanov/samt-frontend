import { useEffect, useRef, useState, useCallback } from 'react';
import districtService from '../../../entities/district/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadDistricts = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await districtService.fetchDistricts();
      setDistricts(data);
    } catch (err) {
      setError(err);
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Загружаем районы при изменении языка
  useEffect(() => {
    loadDistricts();
  }, [loadDistricts]);

  return { districts, loading, error, reload: loadDistricts };
}; 