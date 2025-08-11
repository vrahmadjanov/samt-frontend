import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchNotificationTypes } from '../../../entities/notification/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useNotificationTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadTypes = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotificationTypes();
      setTypes(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Единый эффект: инициализация и обновление при смене языка
  useEffect(() => {
    loadTypes();
  }, [loadTypes]);

  return { types, loading, error };
}; 