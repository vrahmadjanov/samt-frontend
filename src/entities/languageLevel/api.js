import { createApiClient } from '../../shared/utils/apiClient';

// Получение списка уровней владения языком
export const fetchLanguageLevels = async () => {
  const api = createApiClient('/language_levels/');
  return await api.get();
};

export default {
  fetchLanguageLevels,
};


