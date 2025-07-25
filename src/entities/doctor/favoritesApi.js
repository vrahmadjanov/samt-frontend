import axios from 'axios';
import tokenService from '../user/tokenService';

const BASE_URL = 'http://89.111.172.219/api';

export const addDoctorToFavorites = async (doctorId) => {
  const accessToken = tokenService.getAccessToken();
  const response = await axios.post(
    `${BASE_URL}/patients/favorites/doctors/`,
    { doctor_id: doctorId },
    {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    }
  );
  return response.data;
}; 