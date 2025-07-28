import React, { useState } from 'react';
import { useClinics } from '../features/clinic/model/useClinics';
import { useRegions } from '../features/clinic/model/useRegions';
import { useDistricts } from '../features/clinic/model/useDistricts';
import { useClinicTypes } from '../features/clinic/model/useClinicTypes';
import { useFavoriteClinics } from '../features/clinic/model/useFavoriteClinics';
import ClinicList from '../shared/components/organisms/ClinicList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import styled from 'styled-components';
import Pagination from '../shared/components/organisms/Pagination';
import { useTranslation } from '../shared/i18n/useTranslation';

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

const ClinicsPage = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const { clinics, page, totalPages, loading, error, loadPage } = useClinics(activeFilters);
  const { regions } = useRegions();
  const { districts } = useDistricts();
  const { clinicTypes } = useClinicTypes();
  const { favoriteIds, addToFavorites, removeFromFavorites } = useFavoriteClinics();

  // Динамически формируем фильтры на основе загруженных данных
  const filterGroups = [
    ...(regions.length > 0 ? [{
      id: 'region',
      title: t('clinics.filters.region'),
      options: regions.map(r => ({ id: r.name, label: r.name }))
    }] : []),
    ...(districts.length > 0 ? [{
      id: 'district',
      title: t('clinics.filters.district'),
      options: districts.map(d => ({ id: d.name, label: d.name }))
    }] : []),
    ...(clinicTypes.length > 0 ? [{
      id: 'clinic_type',
      title: t('clinics.filters.type'),
      options: clinicTypes.map(ct => ({ id: ct.id.toString(), label: ct.name }))
    }] : [])
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const apiFilters = {
      ...activeFilters,
      name: searchValue
    };
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
    const apiFilters = {
      ...filters,
      name: searchValue
    };
    setActiveFilters(apiFilters);
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
  };

  const handleFavorite = (clinicId, isAdding) => {
    if (isAdding) {
      addToFavorites(clinicId);
    } else {
      removeFromFavorites(clinicId);
    }
  };

  return (
    <Wrapper>
      <PageTitle>{t('clinics.title')}</PageTitle>
      
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isFilterActive={isFilterActive}
        onFilterClick={handleFilterClick}
        searchPlaceholder={t('clinics.searchPlaceholder')}
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
      {!loading && !error && <ClinicList clinics={clinics} favorites={favoriteIds} onFavorite={handleFavorite} />}
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={loadPage}
      />
    </Wrapper>
  );
};

export default ClinicsPage; 