import { useState } from 'react';
import authService from '../../../entities/user/service';

export function useVerification() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async ({ phone_number, confirmation_code }) => {
    setLoading(true);
    setError(null);
    try {
      await authService.verifyCode({ phone_number, confirmation_code });
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Ошибка подтверждения');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verify, error, loading };
} 