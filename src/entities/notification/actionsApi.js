import axios from 'axios';
import tokenService from '../user/tokenService';

const BASE_URL = 'http://89.111.172.219/api';

export const markNotificationsAsRead = async (notificationIds) => {
  const accessToken = tokenService.getAccessToken();
  const response = await axios.post(
    `${BASE_URL}/notifications/mark_as_read/`,
    { ids: notificationIds },
    {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    }
  );
  return response.data;
};

export const deleteNotifications = async (notificationIds) => {
  const accessToken = tokenService.getAccessToken();
  const response = await axios.delete(
    `${BASE_URL}/notifications/delete_multiple/`,
    {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      data: { ids: notificationIds },
    }
  );
  return response.data;
}; 