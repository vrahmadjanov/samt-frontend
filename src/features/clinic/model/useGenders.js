import { useEffect, useRef, useState } from 'react';
import genderService from '../../../entities/gender/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  const loadGenders = async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await genderService.fetchGenders();
      setGenders(data);
    } catch (err) {
      setError(err);
      setGenders([]);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем полы при изменении языка
  useEffect(() => {
    loadGenders();
  }, [language]);

  return { genders, loading, error, reload: loadGenders };
}; 