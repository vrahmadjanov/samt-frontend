import { useCallback, useState } from 'react';
import { createAppointment } from '../../../entities/appointment/api';

export const useCreateAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const create = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await createAppointment(data);
      return response;
    } catch (err) {
      setError(err.message || 'Ошибка создания записи');
      if (err.fields) setFieldErrors(err.fields);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error, fieldErrors };
};


