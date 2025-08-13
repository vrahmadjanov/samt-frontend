import React, { useState, useCallback, useMemo } from 'react';
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
  const filterGroups = useMemo(() => [
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
  ], [regions, districts, clinicTypes, t]);

  const handleSearchChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const apiFilters = mapUiFiltersToApi({
      selectedFilters,
      regions,
      districts,
      clinicTypes,
      searchValue
    });
    setActiveFilters(apiFilters);
  }, [selectedFilters, regions, districts, clinicTypes, searchValue]);

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
      regions,
      districts,
      clinicTypes,
      searchValue
    });
    setActiveFilters(apiFilters);
  }, [regions, districts, clinicTypes, searchValue]);

  const handleResetFilters = useCallback(() => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
    setIsFilterPanelOpen(false);
  }, []);

  const handleFavorite = useCallback((clinicId, isAdding) => {
    if (isAdding) {
      addToFavorites(clinicId);
    } else {
      removeFromFavorites(clinicId);
    }
  }, [addToFavorites, removeFromFavorites]);

  const handlePageChange = useCallback((p) => {
    if (loading) return;
    loadPage(p);
  }, [loading, loadPage]);

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

      {error && <ErrorMessage>{t('common.error')}</ErrorMessage>}
      <ClinicList
        loading={loading}
        clinics={clinics}
        favorites={favoriteIds}
        onFavorite={handleFavorite}
      />
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={handlePageChange}
        loading={loading}
      />
    </PageWrapper>
  );
};

export default ClinicsPage; 