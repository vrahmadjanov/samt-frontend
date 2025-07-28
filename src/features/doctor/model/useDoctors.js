import { useEffect, useState, useRef } from 'react';
import { fetchDoctors } from '../../../entities/doctor/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useDoctors = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
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

  return { doctors, page, totalPages, loading, error, loadPage };
}; 