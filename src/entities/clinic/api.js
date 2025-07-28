import axios from 'axios';
import tokenService from '../user/tokenService';

const BASE_URL = 'http://89.111.172.219/api';

export const fetchClinics = async (page = 1, filters = {}) => {
  const accessToken = tokenService.getAccessToken();
  
  // Формируем URL с параметрами
  const params = new URLSearchParams();
  params.append('page', page);
  // Динамически добавляем все фильтры
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  
  const response = await axios.get(`${BASE_URL}/clinics-paginated/?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data; // предполагается, что data = { count, next, previous, results }
}; 