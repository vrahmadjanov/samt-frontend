import { useState } from 'react';
import { useAuthContext } from './AuthContext';

export function useVerification({ navigate }) {
  const [error, setError] = useState(null);
  const { login, loading } = useAuthContext();

  const verify = async ({ phone_number, confirmation_code }) => {
    setError(null);
    try {
      // Здесь должна быть логика верификации кода
      // После успешной верификации, пользователь автоматически авторизуется
      await login({ phone: phone_number, password: confirmation_code });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка подтверждения');
      throw err;
    }
  };

  return { verify, error, loading };
} 