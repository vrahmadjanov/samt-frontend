import { createApiClient } from '../../shared/utils/apiClient';

// Получение мест оказания услуги
export const fetchServicePlaces = async () => {
  const api = createApiClient('/service_places/');
  return await api.get();
};

export default {
  fetchServicePlaces,
};


