import { useEffect, useState } from 'react';
import specialtyService from '../../../entities/specialty/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadSpecialties = async () => {
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
  };

  // Загружаем специальности при изменении языка
  useEffect(() => {
    loadSpecialties();
  }, [language]);

  return { specialties, loading, error, reload: loadSpecialties };
}; 