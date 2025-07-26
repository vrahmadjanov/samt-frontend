import { useState, useEffect, useCallback } from 'react';
import authService from '../../../entities/user/service';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        if (authService.isAuthenticated()) {
          const userData = authService.getUserData();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Если есть токен, но нет данных пользователя, попробуем обновить токен
            try {
              await authService.refreshToken();
              const refreshedUserData = authService.getUserData();
              if (refreshedUserData) {
                setUser(refreshedUserData);
                setIsAuthenticated(true);
              } else {
                // Если не удалось получить данные пользователя, очищаем токены
                authService.logout();
              }
            } catch (error) {
              // Если не удалось обновить токен, очищаем токены
              authService.logout();
            }
          }
        }
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Авторизация пользователя
  const login = useCallback(async ({ phone, password }) => {
    try {
      setLoading(true);
      const userData = await authService.login({ phone, password });
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Выход из системы
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // Даже если произошла ошибка, очищаем локальное состояние
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление токена
  const refreshToken = useCallback(async () => {
    try {
      const result = await authService.refreshToken();
      const userData = authService.getUserData();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      // Если не удалось обновить токен, очищаем состояние
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  // Проверка валидности токена
  const verifyToken = useCallback(async (token) => {
    return await authService.verifyToken(token);
  }, []);

  // Получение информации о пользователе из токена
  const getTokenUserInfo = useCallback(() => {
    return authService.getTokenUserInfo();
  }, []);

  // Получение времени истечения токена
  const getTokenExpirationTime = useCallback(() => {
    return authService.getTokenExpirationTime();
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshToken,
    verifyToken,
    getTokenUserInfo,
    getTokenExpirationTime,
  };
} 