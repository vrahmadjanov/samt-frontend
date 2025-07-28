import { useEffect, useState } from 'react';
import { fetchClinicTypes } from '../../../entities/clinicType/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useClinicTypes = () => {
  const [clinicTypes, setClinicTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadClinicTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClinicTypes();
      setClinicTypes(data);
    } catch (err) {
      setError(err);
      setClinicTypes([]);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем типы клиник при изменении языка
  useEffect(() => {
    loadClinicTypes();
  }, [language]);

  return { clinicTypes, loading, error, reload: loadClinicTypes };
}; 