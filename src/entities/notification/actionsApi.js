import { createApiClient } from '../../shared/utils/apiClient';

export const markNotificationsAsRead = async (notificationIds) => {
  const api = createApiClient('/notifications/mark_as_read/');
  return await api.post({ ids: notificationIds });
};

export const deleteNotifications = async (notificationIds) => {
  const api = createApiClient('/notifications/delete_multiple/');
  return await api.delete({ ids: notificationIds });
};