import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead, markNotificationsAsRead, deleteNotifications } from '../../../entities/notification/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useNotifications = (filters = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSizeRef = useRef(null);
  const { language } = useLanguage();

  const loadPage = useCallback(async (p = 1, currentFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications(p, currentFilters);
      setNotifications(data.results);
      setPage(p);
      // Сохраняем pageSize только с первой страницы
      if (pageSizeRef.current === null && data.results.length > 0) {
        pageSizeRef.current = data.results.length;
      }
      const pageSize = pageSizeRef.current || data.results.length || 1;
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      // Обновляем список после отметки как прочитанное
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadPage, page, filters]);

  const markAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsRead();
      // Обновляем список после отметки всех как прочитанные
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadPage, page, filters]);

  const markMultipleAsRead = useCallback(async (notificationIds) => {
    try {
      await markNotificationsAsRead(notificationIds);
      // Обновляем список после отметки как прочитанные
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadPage, page, filters]);

  const deleteMultiple = useCallback(async (notificationIds) => {
    try {
      await deleteNotifications(notificationIds);
      // Обновляем список после удаления
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadPage, page, filters]);

  // Перезагружаем данные при изменении фильтров
  useEffect(() => {
    loadPage(1, filters);
    // eslint-disable-next-line
  }, [filters, loadPage]);

  // Перезагружаем данные при изменении языка
  useEffect(() => {
    loadPage(1, filters);
    // eslint-disable-next-line
  }, [language, loadPage]);

  // Инициализация при первом рендере
  useEffect(() => {
    loadPage(1, filters);
    // eslint-disable-next-line
  }, [loadPage]);

  return { 
    notifications, 
    page, 
    totalPages, 
    loading, 
    error, 
    loadPage,
    markAsRead,
    markAllAsRead,
    markMultipleAsRead,
    deleteMultiple
  };
}; 