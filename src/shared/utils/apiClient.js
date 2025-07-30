import httpClient, { setLanguageHeader } from './httpClient';

// Общий API клиент с обработкой ошибок и языков
export class ApiClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Установка языка для запроса
  setLanguage(language = 'ru') {
    setLanguageHeader(language);
  }

  // GET запрос
  async get(params = {}) {
    try {
      const currentLanguage = localStorage.getItem('app_language') || 'ru';
      this.setLanguage(currentLanguage);
      
      const response = await httpClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST запрос
  async post(data, params = {}) {
    try {
      const currentLanguage = localStorage.getItem('app_language') || 'ru';
      this.setLanguage(currentLanguage);
      
      const response = await httpClient.post(this.endpoint, data, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PATCH запрос
  async patch(data, params = {}) {
    try {
      const currentLanguage = localStorage.getItem('app_language') || 'ru';
      this.setLanguage(currentLanguage);
      
      const response = await httpClient.patch(this.endpoint, data, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE запрос
  async delete(params = {}) {
    try {
      const currentLanguage = localStorage.getItem('app_language') || 'ru';
      this.setLanguage(currentLanguage);
      
      const response = await httpClient.delete(this.endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Централизованная обработка ошибок
  handleError(error) {
    console.error(`API Error (${this.endpoint}):`, error);
    
    if (error.response?.status === 401) {
      throw new Error('Необходима авторизация');
    }
    
    if (error.response?.status === 422) {
      const errors = {};
      error.response.data.errors?.forEach(({ field, message }) => {
        errors[field] = message;
      });
      throw errors;
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Произошла ошибка при выполнении запроса');
  }
}

// Фабрика для создания API клиентов
export const createApiClient = (endpoint) => {
  return new ApiClient(endpoint);
}; 