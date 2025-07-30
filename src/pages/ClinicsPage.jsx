import React, { useState } from 'react';
import { useClinics } from '../features/clinic/model/useClinics';
import { useRegions } from '../features/clinic/model/useRegions';
import { useDistricts } from '../features/clinic/model/useDistricts';
import { useClinicTypes } from '../features/clinic/model/useClinicTypes';
import { useFavoriteClinics } from '../features/clinic/model/useFavoriteClinics';
import ClinicList from '../shared/components/organisms/ClinicList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import Pagination from '../shared/components/organisms/Pagination';
import { useTranslation } from '../shared/i18n/useTranslation';
import { mapUiFiltersToApi } from '../entities/clinic/filterMapper';
import LoadingMessage from '../shared/components/atoms/LoadingMessage';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import PageTitle from '../shared/components/atoms/PageTitle';
import PageWrapper from '../shared/components/atoms/PageWrapper';







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
      options: regions.map(r => ({ id: r.id, label: r.name }))
    }] : []),
    ...(districts.length > 0 ? [{
      id: 'district',
      title: t('clinics.filters.district'),
      options: districts.map(d => ({ id: d.id, label: d.name }))
    }] : []),
    ...(clinicTypes.length > 0 ? [{
      id: 'clinic_type',
      title: t('clinics.filters.type'),
      options: clinicTypes.map(ct => ({ id: ct.id, label: ct.name }))
    }] : [])
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const apiFilters = mapUiFiltersToApi({
      selectedFilters,
      regions,
      districts,
      clinicTypes,
      searchValue
    });
    setActiveFilters(apiFilters);
  };

  const handleFilterClick = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
    setIsFilterActive(!isFilterActive);
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
      regions,
      districts,
      clinicTypes,
      searchValue
    });
    setActiveFilters(apiFilters);
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
    setIsFilterPanelOpen(false);
  };

  const handleFavorite = (clinicId, isAdding) => {
    if (isAdding) {
      addToFavorites(clinicId);
    } else {
      removeFromFavorites(clinicId);
    }
  };

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default ClinicsPage; 