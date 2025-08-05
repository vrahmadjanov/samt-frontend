export const mapNotificationUiFiltersToApi = ({ selectedFilters, notificationTypes, searchValue }) => {
  const apiFilters = {};

  // Добавляем поиск по тексту
  if (searchValue && searchValue.trim()) {
    apiFilters.search = searchValue.trim();
  }

  // Добавляем фильтр по типу уведомления
  if (selectedFilters.notificationType) {
    apiFilters.notification_type = selectedFilters.notificationType;
  }

  // Добавляем фильтр по статусу прочтения
  if (selectedFilters.readStatus) {
    apiFilters.is_read = selectedFilters.readStatus === 'read' ? 'true' : 'false';
  }

  return apiFilters;
}; 