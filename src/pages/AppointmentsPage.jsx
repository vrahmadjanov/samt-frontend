import React, { useState } from 'react';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useAppointments } from '../features/appointment/model/useAppointments';
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
    cancelAppointment, 
    confirmAppointment 
  } = useAppointments(activeFilters);

  // Фильтры на основе статусов из API
  const filterGroups = [
    {
      id: 'status',
      title: t('appointments.filters.status'),
      options: [
        { id: 'upcoming', label: t('appointments.status.upcoming') },
        { id: 'completed', label: t('appointments.status.completed') },
        { id: 'cancelled', label: t('appointments.status.cancelled') }
      ]
    }
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newFilters = { ...activeFilters };
    if (searchValue.trim()) {
      newFilters.search = searchValue.trim();
    } else {
      delete newFilters.search;
    }
    setActiveFilters(newFilters);
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
    
    const apiFilters = { ...activeFilters };
    
    if (filters.status) {
      const statusMap = {
        'upcoming': 1,
        'completed': 2,
        'cancelled': 3
      };
      apiFilters.status = statusMap[filters.status];
    } else {
      delete apiFilters.status;
    }
    
    setActiveFilters(apiFilters);
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
    setIsFilterPanelOpen(false);
  };

  const handleCancelAppointment = async (appointmentId) => {
    const result = await cancelAppointment(appointmentId);
    if (result.success) {
      console.log('Appointment cancelled successfully');
    } else {
      console.error('Failed to cancel appointment:', result.error);
    }
  };

  const handleConfirmAppointment = async (appointmentId, isDoctor = false) => {
    const result = await confirmAppointment(appointmentId, isDoctor);
    if (result.success) {
      console.log('Appointment confirmed successfully');
    } else {
      console.error('Failed to confirm appointment:', result.error);
    }
  };

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
          onConfirm={handleConfirmAppointment}
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