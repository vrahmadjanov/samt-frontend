import { createApiClient } from '../../shared/utils/apiClient';

// Получение списка языков
export const fetchLanguages = async () => {
  const api = createApiClient('/languages/');
  return await api.get();
};

export default {
  fetchLanguages,
};


