import React, { useState } from 'react';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useNotifications } from '../features/notification/model/useNotifications';
import { useNotificationTypes } from '../features/notification/model/useNotificationTypes';
import { mapNotificationUiFiltersToApi } from '../entities/notification/filterMapper';
import NotificationsList from '../shared/components/organisms/NotificationsList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import Pagination from '../shared/components/organisms/Pagination';
import LoadingMessage from '../shared/components/atoms/LoadingMessage';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import PageTitle from '../shared/components/atoms/PageTitle';
import PageWrapper from '../shared/components/atoms/PageWrapper';

const NotificationsPage = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const { 
    notifications, 
    loading, 
    error, 
    page, 
    totalPages, 
    loadPage, 
    markAsRead 
  } = useNotifications(activeFilters);

  // Используем хук для загрузки типов уведомлений
  const { types } = useNotificationTypes();

  // Фильтры на основе типов из API
  const filterGroups = [
    ...(types.length > 0 ? [{
      id: 'notificationType',
      title: t('notifications.filters.type'),
      options: types.map(t => ({ id: t.id, label: t.name }))
    }] : []),
    {
      id: 'readStatus',
      title: t('notifications.filters.status'),
      options: [
        { id: 'unread', label: t('notifications.status.unread') },
        { id: 'read', label: t('notifications.status.read') }
      ]
    }
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const apiFilters = mapNotificationUiFiltersToApi({
      selectedFilters,
      notificationTypes: types,
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
    const apiFilters = mapNotificationUiFiltersToApi({
      selectedFilters: filters,
      notificationTypes: types,
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

  const handleMarkAsRead = async (notificationId) => {
    const result = await markAsRead(notificationId);
    if (result.success) {
      console.log('Notification marked as read successfully');
    } else {
      console.error('Failed to mark notification as read:', result.error);
    }
  };



  const handleNavigate = (url) => {
    // TODO: реализовать навигацию по URL
    console.log('Navigate to:', url);
    // window.location.href = url; // или использовать роутер
  };

  return (
    <PageWrapper>
      <PageTitle>{t('notifications.title')}</PageTitle>
      
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isFilterActive={isFilterActive}
        onFilterClick={handleFilterClick}
        searchPlaceholder={t('notifications.searchPlaceholder')}
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
        <NotificationsList
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onNavigate={handleNavigate}
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

export default NotificationsPage; 