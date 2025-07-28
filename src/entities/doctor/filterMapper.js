// Маппер фильтров для API
export function mapUiFiltersToApi({ selectedFilters, genders, specialties, experienceLevels, searchValue }) {
  const apiFilters = {};
  
  // Пол - передаем id
  if (selectedFilters.gender) {
    apiFilters.gender = selectedFilters.gender;
  }
  
  // Специальность - передаем id
  if (selectedFilters.specialties) {
    apiFilters.specialties = selectedFilters.specialties;
  }
  
  // Опыт работы - передаем id
  if (selectedFilters.experience) {
    apiFilters.experience_level = selectedFilters.experience;
  }
  
  // Поиск
  if (searchValue && searchValue.trim()) {
    apiFilters.search = searchValue.trim();
  }
  
  return apiFilters;
} 