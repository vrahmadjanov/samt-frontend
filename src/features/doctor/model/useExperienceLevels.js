import { useEffect, useState } from 'react';
import experienceService from '../../../entities/experience/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useExperienceLevels = () => {
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadExperienceLevels = async () => {
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
  };

  // Загружаем уровни опыта при изменении языка
  useEffect(() => {
    loadExperienceLevels();
  }, [language]);

  return { experienceLevels, loading, error, reload: loadExperienceLevels };
}; 