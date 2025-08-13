import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchClinics } from '../../../entities/clinic/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useClinics = (filters = {}) => {
  const [clinics, setClinics] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSizeRef = useRef(null);
  const lastRequestKeyRef = useRef(null);
  const { language } = useLanguage();

  const loadPage = useCallback(async (p = 1, currentFilters = filters) => {
    const requestKey = JSON.stringify({ p, currentFilters, language });
    if (lastRequestKeyRef.current === requestKey) {
      return;
    }
    lastRequestKeyRef.current = requestKey;

    setLoading(true);
    setClinics([]);
    setError(null);
    try {
      const data = await fetchClinics(p, currentFilters);
      setClinics(data.results);
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

  return { clinics, page, totalPages, loading, error, loadPage };
}; 