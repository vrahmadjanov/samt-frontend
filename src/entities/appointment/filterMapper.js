// Маппер фильтров для API записей
export function mapAppointmentUiFiltersToApi({ selectedFilters, statuses, searchValue }) {
  const apiFilters = {};
  
  // Статус записи - передаем id
  if (selectedFilters.status) {
    apiFilters.status = selectedFilters.status;
  }
  
  // Поиск
  if (searchValue && searchValue.trim()) {
    apiFilters.search = searchValue.trim();
  }
  
  return apiFilters;
} 