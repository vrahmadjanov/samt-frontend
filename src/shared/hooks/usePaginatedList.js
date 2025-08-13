import { useCallback, useEffect, useRef, useState } from 'react';

// Универсальный хук постраничной загрузки
// fetchPage: (page:number) => Promise<{ count:number, results:any[] }>
// deps: любые зависимости, при изменении которых будет перезагрузка на 1-ю страницу
export const usePaginatedList = (fetchPage, deps = []) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSizeRef = useRef(null);
  const lastRequestKeyRef = useRef(null);

  const loadPage = useCallback(async (p = 1) => {
    const requestKey = JSON.stringify({ p, deps });
    if (lastRequestKeyRef.current === requestKey) {
      return;
    }
    lastRequestKeyRef.current = requestKey;

    setLoading(true);
    setError(null);
    setItems([]);
    try {
      const data = await fetchPage(p);
      const results = Array.isArray(data?.results) ? data.results : [];
      const count = typeof data?.count === 'number' ? data.count : results.length;
      setItems(results);
      setPage(p);
      if (pageSizeRef.current === null && results.length > 0) {
        pageSizeRef.current = results.length;
      }
      const pageSize = pageSizeRef.current || results.length || 1;
      setTotalPages(Math.ceil(count / pageSize));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchPage, deps]);

  useEffect(() => {
    // сбрасываем ключ запроса, чтобы разрешить первый запрос с новыми deps
    lastRequestKeyRef.current = null;
    pageSizeRef.current = null;
    loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { items, page, totalPages, loading, error, loadPage };
};


