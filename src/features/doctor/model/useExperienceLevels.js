import { useEffect, useRef, useState, useCallback } from 'react';
import experienceService from '../../../entities/experience/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useExperienceLevels = () => {
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadExperienceLevels = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await experienceService.getExperienceLevels();
      setExperienceLevels(data);
    } catch (err) {
      setError(err);
      setExperienceLevels([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Загружаем уровни опыта при изменении языка
  useEffect(() => {
    loadExperienceLevels();
  }, [loadExperienceLevels]);

  return { experienceLevels, loading, error, reload: loadExperienceLevels };
}; 