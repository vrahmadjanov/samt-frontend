import React, { useState, useCallback, useMemo } from 'react';
import { useDoctors } from '../features/doctor/model/useDoctors';
import { useFavoriteDoctors } from '../features/doctor/model/useFavoriteDoctors';
import DoctorList from '../shared/components/organisms/DoctorList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import Pagination from '../shared/components/organisms/Pagination';
import { mapUiFiltersToApi } from '../entities/doctor/filterMapper';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useGenders } from '../features/clinic/model/useGenders';
import { useSpecialties } from '../features/main/model/useSpecialties';
import { useExperienceLevels } from '../features/doctor/model/useExperienceLevels';
import LoadingMessage from '../shared/components/atoms/LoadingMessage';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import PageTitle from '../shared/components/atoms/PageTitle';
import PageWrapper from '../shared/components/atoms/PageWrapper';

const DoctorsPage = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const { doctors, page, totalPages, loading, error, loadPage } = useDoctors(activeFilters);
  const { favoriteIds, addToFavorites, removeFromFavorites } = useFavoriteDoctors();

  // Используем хуки для загрузки справочников
  const { genders } = useGenders();
  const { specialties } = useSpecialties();
  const { experienceLevels } = useExperienceLevels();

  // Пример данных фильтров
  const filterGroups = useMemo(() => [
    ...(genders.length > 0 ? [{
      id: 'gender',
      title: t('doctors.filters.gender'),
      options: genders.map(g => ({ id: g.id, label: g.name }))
    }] : []),
    ...(specialties.length > 0 ? [{
      id: 'specialties',
      title: t('doctors.filters.specialties'),
      options: specialties.map(s => ({ id: s.id, label: s.name }))
    }] : []),
    ...(experienceLevels.length > 0 ? [{
      id: 'experience',
      title: t('doctors.filters.experience'),
      options: experienceLevels.map(e => ({ id: e.id, label: e.name }))
    }] : [])
  ], [genders, specialties, experienceLevels, t]);

  const handleSearchChange = useCallback((e) => {
    setSearchValue(e.target.value);
    // Убираем автоматическое применение поиска
  }, []);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const apiFilters = mapUiFiltersToApi({
      selectedFilters,
      genders,
      specialties,
      experienceLevels,
      searchValue
    });
    setActiveFilters(apiFilters);
  }, [selectedFilters, genders, specialties, experienceLevels, searchValue]);

  const handleFilterClick = useCallback(() => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
    setIsFilterActive(!isFilterActive);
  }, [isFilterPanelOpen, isFilterActive]);

  const handleFilterChange = useCallback((groupId, optionId) => {
    setSelectedFilters(prev => ({
      ...prev,
      [groupId]: optionId
    }));
  }, []);

  const handleApplyFilters = useCallback((filters) => {
    setIsFilterPanelOpen(false);
    setIsFilterActive(true);
    const apiFilters = mapUiFiltersToApi({
      selectedFilters: filters,
      genders,
      specialties,
      experienceLevels,
      searchValue
    });
    setActiveFilters(apiFilters);
  }, [genders, specialties, experienceLevels, searchValue]);

  const handleResetFilters = useCallback(() => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
    setIsFilterPanelOpen(false);
  }, []);

  const handleFavorite = useCallback((doctorId, isAdding) => {
    if (isAdding) {
      addToFavorites(doctorId);
    } else {
      removeFromFavorites(doctorId);
    }
  }, [addToFavorites, removeFromFavorites]);

  return (
    <PageWrapper>
      <PageTitle>{t('doctors.title')}</PageTitle>
      
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isFilterActive={isFilterActive}
        onFilterClick={handleFilterClick}
        searchPlaceholder={t('doctors.searchPlaceholder')}
      />

      <FilterPanel
        isOpen={isFilterPanelOpen}
        filters={filterGroups}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {loading && <LoadingMessage>{t('common.loading')}</LoadingMessage>}
      {error && <ErrorMessage>{t('common.error')}</ErrorMessage>}
      {!loading && !error && <DoctorList doctors={doctors} favorites={favoriteIds} onFavorite={handleFavorite} />}
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={loadPage}
      />
    </PageWrapper>
  );
};

export default DoctorsPage; 