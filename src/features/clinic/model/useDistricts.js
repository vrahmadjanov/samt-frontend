import { useEffect, useState } from 'react';
import districtService from '../../../entities/district/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadDistricts = async () => {
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
  };

  // Загружаем районы при изменении языка
  useEffect(() => {
    loadDistricts();
  }, [language]);

  return { districts, loading, error, reload: loadDistricts };
}; 