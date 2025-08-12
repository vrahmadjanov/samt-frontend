import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchDoctors } from '../../../entities/doctor/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useDoctors = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSizeRef = useRef(null);
  const lastRequestKeyRef = useRef(null);
  const { language } = useLanguage();

  const loadPage = useCallback(async (p = 1, currentFilters = filters) => {
    // Ключ запроса для защиты от дублей (StrictMode и параллельные вызовы)
    const requestKey = JSON.stringify({ p, currentFilters, language });
    if (lastRequestKeyRef.current === requestKey) {
      return; // уже выполняли этот же запрос
    }
    lastRequestKeyRef.current = requestKey;

    // Показываем скелетоны сразу при смене страницы/фильтров
    setLoading(true);
    setDoctors([]);
    setError(null);
    try {
      const data = await fetchDoctors(p, currentFilters);
      setDoctors(data.results);
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

  // Единый эффект: инициализация и обновление при смене фильтров/языка
  useEffect(() => {
    loadPage(1, filters);
  }, [filters, language, loadPage]);

  return { doctors, page, totalPages, loading, error, loadPage };
}; 