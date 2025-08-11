import { createApiClient } from '../../shared/utils/apiClient';

export const fetchNotificationTypes = async () => {
  const api = createApiClient('/notification_types/');
  return await api.get();
};

export const fetchNotifications = async (page = 1, filters = {}) => {
  const api = createApiClient('/notifications-paginated/');
  const params = { page, ...filters };
  return await api.get(params); // ожидается { count, next, previous, results }
};

export const markNotificationAsRead = async (notificationId) => {
  const api = createApiClient(`/notifications/${notificationId}/mark-read/`);
  return await api.post({});
};

export const markAllNotificationsAsRead = async () => {
  const api = createApiClient('/notifications/mark-all-read/');
  return await api.post({});
};

export const markNotificationsAsRead = async (notificationIds) => {
  const api = createApiClient('/notifications/mark_as_read/');
  return await api.post({ ids: notificationIds });
};

export const deleteNotifications = async (notificationIds) => {
  const api = createApiClient('/notifications/delete_multiple/');
  return await api.delete({ ids: notificationIds });
};