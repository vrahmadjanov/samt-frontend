import httpClient from './httpClient';
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

export function setupAuthInterceptors() {
  httpClient.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) {
          tokenService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return httpClient(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccess = response.data.access;
          tokenService.setTokens({
            access: newAccess,
            refresh: refreshToken,
          });

          processQueue(null, newAccess);
          return httpClient(originalRequest);
        } catch (refreshError) {
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
