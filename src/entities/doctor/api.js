import axios from 'axios';
import tokenService from '../user/tokenService';

const BASE_URL = 'http://89.111.172.219/api';

export const fetchDoctors = async (page = 1) => {
  const accessToken = tokenService.getAccessToken();
  const response = await axios.get(`${BASE_URL}/doctors/list/?page=${page}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data; // предполагается, что data = { count, next, previous, results }
}; 