import { useEffect, useState, useRef } from 'react';
import { fetchAppointments, cancelAppointment as cancelAppointmentAPI, confirmAppointmentByPatient, confirmAppointmentByDoctor } from '../../../entities/appointment/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useAppointments = (filters = {}) => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSizeRef = useRef(null);
  const { language } = useLanguage();

  const loadPage = async (p = 1, currentFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAppointments(p, currentFilters);
      setAppointments(data.results);
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
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointmentAPI(appointmentId);
      // Обновляем список после отмены
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      console.error('Error canceling appointment:', err);
      return { success: false, error: err.message };
    }
  };

  const confirmAppointment = async (appointmentId, isDoctor = false) => {
    try {
      if (isDoctor) {
        await confirmAppointmentByDoctor(appointmentId);
      } else {
        await confirmAppointmentByPatient(appointmentId);
      }
      // Обновляем список после подтверждения
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      console.error('Error confirming appointment:', err);
      return { success: false, error: err.message };
    }
  };

  // Перезагружаем данные при изменении фильтров
  useEffect(() => {
    loadPage(1, filters);
    // eslint-disable-next-line
  }, [filters]);

  // Перезагружаем данные при изменении языка
  useEffect(() => {
    loadPage(1, filters);
    // eslint-disable-next-line
  }, [language]);

  // Инициализация при первом рендере
  useEffect(() => {
    loadPage(1, filters);
    // eslint-disable-next-line
  }, []);

  return { 
    appointments, 
    page, 
    totalPages, 
    loading, 
    error, 
    loadPage,
    cancelAppointment,
    confirmAppointment
  };
}; 