import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchAppointments, cancelAppointment as cancelAppointmentAPI, confirmAppointmentByPatient, confirmAppointmentByDoctor } from '../../../entities/appointment/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useAppointments = (filters = {}) => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSizeRef = useRef(null);
  const lastRequestKeyRef = useRef(null);
  const { language } = useLanguage();

  const loadPage = useCallback(async (p = 1, currentFilters = filters) => {
    const requestKey = JSON.stringify({ p, currentFilters, language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;

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
  }, [filters, language]);

  const cancelAppointment = useCallback(async (appointmentId) => {
    try {
      await cancelAppointmentAPI(appointmentId);
      // Обновляем список после отмены
      await loadPage(page, filters);
      return { success: true };
    } catch (err) {
      console.error('Error canceling appointment:', err);
      return { success: false, error: err.message };
    }
  }, [loadPage, page, filters]);

  const confirmAppointment = useCallback(async (appointmentId, isDoctor = false) => {
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
  }, [loadPage, page, filters]);

  // Единый эффект: инициализация и обновление при смене языка/фильтров
  useEffect(() => {
    loadPage(1, filters);
  }, [filters, language, loadPage]);

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