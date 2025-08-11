import httpClient from './httpClient';

// Общий API клиент с обработкой ошибок и языков
export class ApiClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Язык заголовка управляется централизованно через LanguageProvider/httpClient
  // Оставляем метод-заглушку для обратной совместимости
  setLanguage() {}

  // GET запрос
  async get(params = {}) {
    try {
      const response = await httpClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST запрос
  async post(data, params = {}) {
    try {
      const response = await httpClient.post(this.endpoint, data, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PATCH запрос
  async patch(data, params = {}) {
    try {
      const response = await httpClient.patch(this.endpoint, data, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE запрос (поддержка JSON-body и query-параметров)
  async delete(data = {}, params = {}) {
    try {
      const response = await httpClient.delete(this.endpoint, { data, params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Централизованная обработка ошибок
  handleError(error) {
    console.error(`API Error (${this.endpoint}):`, error);
    const status = error.response?.status;
    const data = error.response?.data || {};

    // Единый формат ошибки
    const unifiedError = {
      message: data.message || data.detail || 'Произошла ошибка при выполнении запроса',
      code: status || 'UNKNOWN',
      fields: undefined,
      raw: error,
    };

    if (status === 401) {
      unifiedError.message = 'Необходима авторизация';
      throw unifiedError;
    }

    if (status === 422) {
      // Маппим ошибки полей в единый вид
      const fields = {};
      if (Array.isArray(data.errors)) {
        data.errors.forEach(({ field, message }) => {
          fields[field] = message;
        });
      }
      unifiedError.fields = fields;
      throw unifiedError;
    }

    // Общий случай
    throw unifiedError;
  }
}

// Фабрика для создания API клиентов
export const createApiClient = (endpoint) => {
  return new ApiClient(endpoint);
}; 