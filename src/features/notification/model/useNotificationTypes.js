import { useEffect, useState } from 'react';
import { fetchNotificationTypes } from '../../../entities/notification/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useNotificationTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadTypes = async () => {
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
  };

  // Перезагружаем данные при изменении языка
  useEffect(() => {
    loadTypes();
    // eslint-disable-next-line
  }, [language]);

  // Инициализация при первом рендере
  useEffect(() => {
    loadTypes();
    // eslint-disable-next-line
  }, []);

  return { types, loading, error };
}; 