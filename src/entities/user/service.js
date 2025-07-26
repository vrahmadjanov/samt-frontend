import httpClient from '../../shared/utils/httpClient';
import tokenService from './tokenService';
import { tokenAPI } from './api';

const authService = {
  // Авторизация пользователя
  async login({ phone, password }) {
    try {
      const response = await tokenAPI.login({ phone, password });
      return response.user;
    } catch (error) {
      // Обработка ошибок из API
      if (error.response?.status === 401) {
        const errors = error.response.data.errors || [];
        const credentialsError = errors.find(e => e.field === 'credentials');
        const message = credentialsError?.message || 'Неверные учетные данные';
        throw new Error(message);
      }
      throw error;
    }
  },

  // Регистрация пользователя
  async register(data) {
    try {
      const response = await httpClient.post('/register/', data);
      if (response.data.status === 'success') {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = {};
        error.response.data.errors.forEach(({ field, message }) => {
          errors[field] = message;
        });
        return Promise.reject(errors);
      }
      throw error;
    }
  },

  // Подтверждение кода верификации
  async verifyCode(data) {
    try {
      const response = await httpClient.post('/verify-code/', data);
      if (response.data.status === 'success') {
        const { access, refresh } = response.data.data.tokens;
        const user = response.data.data.user;
        tokenService.setTokens({ access, refresh, user });
        return response.data.data.user;
      }
      throw new Error(response.data.message);
    } catch (error) {
      if (error.response?.status === 422) {
        const errMsg = error.response.data.errors?.[0]?.message || 'Ошибка проверки кода';
        throw new Error(errMsg);
      }
      throw error;
    }
  },

  // Выход из системы
  logout() {
    tokenService.clearTokens();
    window.location.href = '/login';
  },

  // Проверка авторизации
  isAuthenticated() {
    return tokenService.isAuthenticated();
  },

  // Получение данных пользователя
  getUserData() {
    return tokenService.getUserData() || tokenService.getTokenUserInfo();
  },

  // Обновление токена
  async refreshToken() {
    return await tokenAPI.refreshToken();
  },

  // Проверка валидности токена
  async verifyToken(token) {
    return await tokenAPI.verifyToken(token);
  },

  // Получение информации о пользователе из токена
  getTokenUserInfo() {
    return tokenService.getTokenUserInfo();
  },

  // Получение времени истечения токена
  getTokenExpirationTime() {
    return tokenService.getTokenExpirationTime();
  }
};

export default authService;
