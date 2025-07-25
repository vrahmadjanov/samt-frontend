import { useEffect, useState, useRef } from 'react';
import { fetchDoctors } from '../../../entities/doctor/api';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSizeRef = useRef(null);

  const loadPage = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDoctors(p);
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

  useEffect(() => {
    loadPage(1);
    // eslint-disable-next-line
  }, []);

  return { doctors, page, totalPages, loading, error, loadPage };
}; 