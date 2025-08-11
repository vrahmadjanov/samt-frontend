import { useEffect, useRef, useState, useCallback } from 'react';
import specialtyService from '../../../entities/specialty/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadSpecialties = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await specialtyService.getSpecialties();
      setSpecialties(data);
    } catch (err) {
      setError(err);
      setSpecialties([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Загружаем специальности при изменении языка
  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  return { specialties, loading, error, reload: loadSpecialties };
}; 