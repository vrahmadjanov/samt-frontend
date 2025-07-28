import axios from 'axios';
import tokenService from '../user/tokenService';

const BASE_URL = 'http://89.111.172.219/api';

export const fetchClinicTypes = async () => {
  const accessToken = tokenService.getAccessToken();
  
  const response = await axios.get(`${BASE_URL}/clinic_types/`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return response.data;
}; 