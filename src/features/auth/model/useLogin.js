import { useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function useLogin() {
  const [error, setError] = useState(null);
  const { login, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async ({ phone, password }) => {
    setError(null);
    try {
      await login({ phone, password });
      
      // Перенаправляем на страницу, с которой пришел пользователь, или на главную
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Ошибка авторизации');
    }
  };

  return { login: handleLogin, error, loading };
} 