import httpClient from '../../shared/utils/httpClient';
import tokenService from './tokenService';

const authService = {
  async login({ phone, password }) {
    try {
      const response = await httpClient.post('/token/', {
        phone_number: phone,
        password,
      });

      if (response.data.status === 'success' && response.data.data?.tokens) {
        const { access, refresh } = response.data.data.tokens;
        tokenService.setTokens({ access, refresh });
        return response.data.data.user;
      } else {
        throw new Error(response.data.message || 'Ошибка авторизации');
      }
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

  async verifyCode(data) {
    try {
      const response = await httpClient.post('/verify-code/', data);
      if (response.data.status === 'success') {
        const { access, refresh } = response.data.data.tokens;
        tokenService.setTokens({ access, refresh });
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

  logout() {
    tokenService.clearTokens();
    window.location.href = '/login';
  },
};

export default authService;
