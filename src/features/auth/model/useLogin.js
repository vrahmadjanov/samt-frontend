import { useState } from 'react';
import authService from '../../../entities/user/service';

export function useLogin({ navigate, from }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async ({ phone, password }) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login({ phone, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
} 