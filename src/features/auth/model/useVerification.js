import { useState } from 'react';
import authService from '../../../entities/user/service';

export function useVerification({ navigate }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async ({ phone_number, confirmation_code }) => {
    setLoading(true);
    setError(null);
    try {
      await authService.verifyCode({ phone_number, confirmation_code });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка подтверждения');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verify, error, loading };
} 