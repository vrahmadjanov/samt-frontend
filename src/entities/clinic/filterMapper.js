// Маппер фильтров для API клиник
export function mapUiFiltersToApi({ selectedFilters, regions, districts, clinicTypes, searchValue }) {
  const apiFilters = {};
  
  // Регион - передаем id
  if (selectedFilters.region) {
    apiFilters.region = selectedFilters.region;
  }
  
  // Район - передаем id
  if (selectedFilters.district) {
    apiFilters.district = selectedFilters.district;
  }
  
  // Тип клиники - передаем id
  if (selectedFilters.clinic_type) {
    apiFilters.clinic_type = selectedFilters.clinic_type;
  }
  
  // Поиск по названию
  if (searchValue && searchValue.trim()) {
    apiFilters.name = searchValue.trim();
  }
  
  return apiFilters;
} 