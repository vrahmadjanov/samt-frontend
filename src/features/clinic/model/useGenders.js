import { useEffect, useState } from 'react';
import genderService from '../../../entities/gender/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadGenders = async () => {
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