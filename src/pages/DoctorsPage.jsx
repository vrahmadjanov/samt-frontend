import React, { useState } from 'react';
import { useDoctors } from '../features/doctor/model/useDoctors';
import { useFavoriteDoctors } from '../features/doctor/model/useFavoriteDoctors';
import DoctorList from '../shared/components/organisms/DoctorList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import styled from 'styled-components';
import Pagination from '../shared/components/organisms/Pagination';
import { mapUiFiltersToApi } from '../entities/doctor/filterMapper';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useGenders } from '../features/clinic/model/useGenders';
import { useSpecialties } from '../features/main/model/useSpecialties';
import { useExperienceLevels } from '../features/doctor/model/useExperienceLevels';

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: var(--spacing-xl) var(--spacing-md);
  }
`;

const PageTitle = styled.h1`
  margin-bottom: var(--spacing-lg);
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-xl);
  font-weight: 600;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.error};
  font-size: var(--font-base);
`;

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
  const filterGroups = [
    ...(genders.length > 0 ? [{
      id: 'gender',
      title: t('doctors.filters.gender'),
      options: genders.map(g => ({ id: g.id || g.slug || g.name, label: g.name }))
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
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // Убираем автоматическое применение поиска
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const apiFilters = mapUiFiltersToApi({
      selectedFilters,
      genders,
      specialties,
      experienceLevels,
      searchValue
    });
    setActiveFilters(apiFilters);
  };

  const handleFilterClick = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
    setIsFilterActive(!isFilterPanelOpen);
  };

  const handleFilterChange = (groupId, optionId) => {
    setSelectedFilters(prev => ({
      ...prev,
      [groupId]: optionId
    }));
  };

  const handleApplyFilters = (filters) => {
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
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
  };

  const handleFavorite = (doctorId, isAdding) => {
    if (isAdding) {
      addToFavorites(doctorId);
    } else {
      removeFromFavorites(doctorId);
    }
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default DoctorsPage; 