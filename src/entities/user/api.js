import httpClient from '../../shared/utils/httpClient';
import tokenService from './tokenService';
import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const BASE_URL = 'http://89.111.172.219/api';

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// API для работы с токенами
export const tokenAPI = {
  // Авторизация пользователя
  async login(credentials) {
    try {
      const response = await axios.post(`${BASE_URL}/token/`, {
        phone_number: credentials.phone,
        password: credentials.password,
      });

      if (response.data.status === 'success' && response.data.data?.tokens) {
        const { access, refresh } = response.data.data.tokens;
        const user = response.data.data.user;
        
        tokenService.setTokens({ access, refresh, user });
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Ошибка авторизации');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const errors = error.response.data.errors || [];
        const credentialsError = errors.find(e => e.field === 'credentials');
        const message = credentialsError?.message || 'Неверные учетные данные';
        throw new Error(message);
      }
      throw error;
    }
  },

  // Обновление токена
  async refreshToken() {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('Refresh токен отсутствует');
    }

    try {
      const response = await axios.post(`${BASE_URL}/token/refresh/`, {
        refresh: refreshToken,
      });

      const { access, refresh } = response.data;
      tokenService.setTokens({ access, refresh });
      return { access, refresh };
    } catch (error) {
      // Если refresh токен истек, очищаем все токены
      if (error.response?.status === 401) {
        tokenService.clearTokens();
        throw new Error('Сессия истекла. Необходима повторная авторизация');
      }
      throw error;
    }
  },

  // Проверка валидности токена
  async verifyToken(token) {
    try {
      const response = await axios.post(`${BASE_URL}/token/verify/`, {
        token: token || tokenService.getAccessToken(),
      });
      return response.data;
    } catch (error) {
      return false;
    }
  },

  // Выход из системы
  async logout() {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (refreshToken) {
        // Отправляем запрос на сервер для инвалидации токена
        await axios.post(`${BASE_URL}/token/logout/`, {
          refresh: refreshToken,
        }).catch(() => {
          // Игнорируем ошибки при logout
        });
      }
    } catch (error) {
      // Игнорируем ошибки при logout
    } finally {
      tokenService.clearTokens();
    }
  },

  // Удаление аккаунта
  async deleteAccount() {
    try {
      const response = await httpClient.delete('/users/delete-my-account/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Настройка перехватчиков для автоматического обновления токенов
export function setupAuthInterceptors() {
  // Перехватчик запросов - добавляет токен к каждому запросу
  httpClient.interceptors.request.use(
    (config) => {
      const token = tokenService.getAccessToken();
      if (token && tokenService.isAccessTokenValid()) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Перехватчик ответов - обрабатывает 401 ошибки и обновляет токены
  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Если получили 401 и еще не пытались обновить токен
      if (error.response?.status === 401 && !originalRequest._retry) {
        const refreshToken = tokenService.getRefreshToken();
        
        if (!refreshToken || !tokenService.isRefreshTokenValid()) {
          // Нет валидного refresh токена - перенаправляем на логин
          tokenService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Если уже идет процесс обновления токена, добавляем запрос в очередь
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          }).catch((err) => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { access } = await tokenAPI.refreshToken();
          
          // Обновляем заголовок с новым токеном
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          // Разрешаем все запросы в очереди
          processQueue(null, access);
          
          // Повторяем оригинальный запрос с новым токеном
          return httpClient(originalRequest);
        } catch (refreshError) {
          // Ошибка обновления токена
          processQueue(refreshError, null);
          tokenService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}

// Инициализация перехватчиков при импорте модуля
setupAuthInterceptors();
