import { useEffect, useRef } from 'react';
import { useAuthContext } from './AuthContext';
import authService from '../../../entities/user/service';

const TokenRefreshManager = () => {
  const { isAuthenticated, refreshToken } = useAuthContext();
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    // Очищаем предыдущий интервал
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    // Если пользователь авторизован, запускаем автоматическое обновление токенов
    if (isAuthenticated) {
      const checkAndRefreshToken = async () => {
        try {
          const expirationTime = authService.getTokenExpirationTime();
          if (expirationTime) {
            const now = new Date();
            const timeUntilExpiry = expirationTime.getTime() - now.getTime();
            
            // Если токен истекает через 5 минут или меньше, обновляем его
            if (timeUntilExpiry <= 5 * 60 * 1000) {
              await refreshToken();
            }
          }
        } catch (error) {
          console.error('Ошибка при автоматическом обновлении токена:', error);
        }
      };

      // Проверяем токен каждые 4 минуты
      refreshIntervalRef.current = setInterval(checkAndRefreshToken, 4 * 60 * 1000);
      
      // Первоначальная проверка
      checkAndRefreshToken();
    }

    // Очистка при размонтировании
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [isAuthenticated, refreshToken]);

  // Компонент не рендерит ничего
  return null;
};

export default TokenRefreshManager; 