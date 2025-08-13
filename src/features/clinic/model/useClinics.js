import { fetchClinics } from '../../../entities/clinic/api';
import { useLanguage } from '../../i18n/model/useLanguage';
import { usePaginatedList } from '../../../shared/hooks/usePaginatedList';

export const useClinics = (filters = {}) => {
  const { language } = useLanguage();
  const fetchPage = (p) => fetchClinics(p, filters);
  const { items, page, totalPages, loading, error, loadPage } = usePaginatedList(
    fetchPage,
    [language, JSON.stringify(filters)]
  );

  return { clinics: items, page, totalPages, loading, error, loadPage };
}; 