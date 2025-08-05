import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useAppointments } from '../features/appointment/model/useAppointments';
import { useAppointmentStatuses } from '../features/appointment/model/useAppointmentStatuses';
import { mapAppointmentUiFiltersToApi } from '../entities/appointment/filterMapper';
import AppointmentsList from '../shared/components/organisms/AppointmentsList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import Pagination from '../shared/components/organisms/Pagination';
import LoadingMessage from '../shared/components/atoms/LoadingMessage';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import PageTitle from '../shared/components/atoms/PageTitle';
import PageWrapper from '../shared/components/atoms/PageWrapper';

const AppointmentsPage = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const { 
    appointments, 
    loading, 
    error, 
    page, 
    totalPages, 
    loadPage, 
    cancelAppointment 
  } = useAppointments(activeFilters);

  // Используем хук для загрузки статусов
  const { statuses } = useAppointmentStatuses();

  // Фильтры на основе статусов из API
  const filterGroups = useMemo(() => [
    ...(statuses.length > 0 ? [{
      id: 'status',
      title: t('appointments.filters.status'),
      options: statuses.map(s => ({ id: s.id, label: s.name }))
    }] : [])
  ], [statuses, t]);

  const handleSearchChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const apiFilters = mapAppointmentUiFiltersToApi({
      selectedFilters,
      statuses,
      searchValue
    });
    setActiveFilters(apiFilters);
  }, [selectedFilters, statuses, searchValue]);

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
    const apiFilters = mapAppointmentUiFiltersToApi({
      selectedFilters: filters,
      statuses,
      searchValue
    });
    setActiveFilters(apiFilters);
  }, [statuses, searchValue]);

  const handleResetFilters = useCallback(() => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
    setIsFilterPanelOpen(false);
  }, []);

  const handleCancelAppointment = useCallback(async (appointmentId) => {
    const result = await cancelAppointment(appointmentId);
    if (result.success) {
      console.log('Appointment cancelled successfully');
    } else {
      console.error('Failed to cancel appointment:', result.error);
    }
  }, [cancelAppointment]);

  const handleLeaveReview = useCallback(async (appointmentId) => {
    // TODO: реализовать функциональность оставления отзыва
    console.log('Leave review for appointment:', appointmentId);
  }, []);

  return (
    <PageWrapper>
      <PageTitle>{t('appointments.title')}</PageTitle>
      
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isFilterActive={isFilterActive}
        onFilterClick={handleFilterClick}
        searchPlaceholder={t('appointments.searchPlaceholder')}
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
      {!loading && !error && (
        <AppointmentsList
          appointments={appointments}
          onCancel={handleCancelAppointment}
          onLeaveReview={handleLeaveReview}
        />
      )}
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={loadPage}
      />
    </PageWrapper>
  );
};

export default AppointmentsPage; 