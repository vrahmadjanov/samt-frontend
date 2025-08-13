import { fetchDoctors } from '../../../entities/doctor/api';
import { useLanguage } from '../../i18n/model/useLanguage';
import { usePaginatedList } from '../../../shared/hooks/usePaginatedList';

export const useDoctors = (filters = {}) => {
  const { language } = useLanguage();

  const fetchPage = (p) => fetchDoctors(p, filters);
  const { items, page, totalPages, loading, error, loadPage } = usePaginatedList(
    fetchPage,
    [language, JSON.stringify(filters)]
  );

  return { doctors: items, page, totalPages, loading, error, loadPage };
};