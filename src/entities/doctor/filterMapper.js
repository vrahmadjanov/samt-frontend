// Маппер фильтров для API
export function mapUiFiltersToApi({ selectedFilters, genders, specialties, experienceLevels, searchValue }) {
  const apiFilters = {};
  // Пол
  if (selectedFilters.gender) {
    const genderObj = genders.find(g => (g.id || g.slug || g.name) === selectedFilters.gender);
    if (genderObj) {
      apiFilters.gender = genderObj.name;
    }
  }
  // Специальность
  if (selectedFilters.specialties) {
    const specialtyObj = specialties.find(s => s.id === selectedFilters.specialties);
    if (specialtyObj) {
      apiFilters.specialties = specialtyObj.name;
    }
  }
  // Опыт работы
  if (selectedFilters.experience) {
    const experienceObj = experienceLevels.find(e => e.id === selectedFilters.experience);
    if (experienceObj) {
      apiFilters.experience_level = experienceObj.name;
    }
  }
  // Поиск
  if (searchValue && searchValue.trim()) {
    apiFilters.search = searchValue.trim();
  }
  // Можно добавить другие фильтры по аналогии
  return apiFilters;
} 