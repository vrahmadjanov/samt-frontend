import React, { useState, useEffect } from 'react';
import { useDoctors } from '../features/doctor/model/useDoctors';
import DoctorList from '../shared/components/organisms/DoctorList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import FilterPanel from '../shared/components/organisms/FilterPanel';
import styled from 'styled-components';
import Pagination from '../shared/components/organisms/Pagination';
import genderService from '../entities/gender/api';
import specialtyService from '../entities/specialty/service';
import experienceService from '../entities/experience/service';
import { mapUiFiltersToApi } from '../entities/doctor/filterMapper';

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: var(--spacing-xl) var(--spacing-md);
  }
`;

const PageTitle = styled.h1`
  margin-bottom: var(--spacing-lg);
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-xl);
  font-weight: 600;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.error};
  font-size: var(--font-base);
`;

const DoctorsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [genders, setGenders] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  const { doctors, page, totalPages, loading, error, loadPage } = useDoctors(activeFilters);

  useEffect(() => {
    async function fetchGenders() {
      try {
        const data = await genderService.fetchGenders();
        setGenders(data);
      } catch (e) {
        setGenders([]);
      }
    }
    fetchGenders();
    // Загружаем специальности
    async function fetchSpecialties() {
      try {
        const data = await specialtyService.getSpecialties();
        setSpecialties(data);
      } catch (e) {
        setSpecialties([]);
      }
    }
    fetchSpecialties();
    // Загружаем уровни опыта
    async function fetchExperienceLevels() {
      try {
        const data = await experienceService.getExperienceLevels();
        setExperienceLevels(data);
      } catch (e) {
        setExperienceLevels([]);
      }
    }
    fetchExperienceLevels();
  }, []);

  // Пример данных фильтров
  const filterGroups = [
    ...(genders.length > 0 ? [{
      id: 'gender',
      title: 'Пол',
      options: genders.map(g => ({ id: g.id || g.slug || g.name, label: g.name }))
    }] : []),
    ...(specialties.length > 0 ? [{
      id: 'specialties',
      title: 'Специальности',
      options: specialties.map(s => ({ id: s.id, label: s.name }))
    }] : []),
    ...(experienceLevels.length > 0 ? [{
      id: 'experience',
      title: 'Опыт работы',
      options: experienceLevels.map(e => ({ id: e.id, label: e.name }))
    }] : [])
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // Убираем автоматическое применение поиска
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const apiFilters = mapUiFiltersToApi({
      selectedFilters,
      genders,
      specialties,
      experienceLevels,
      searchValue
    });
    setActiveFilters(apiFilters);
  };

  const handleFilterClick = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
    setIsFilterActive(!isFilterPanelOpen);
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
      genders,
      specialties,
      experienceLevels,
      searchValue
    });
    setActiveFilters(apiFilters);
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setActiveFilters({});
    setSearchValue('');
    setIsFilterActive(false);
  };

  return (
    <Wrapper>
      <PageTitle>Врачи</PageTitle>
      
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isFilterActive={isFilterActive}
        onFilterClick={handleFilterClick}
      />

      <FilterPanel
        isOpen={isFilterPanelOpen}
        filters={filterGroups}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {loading && <LoadingMessage>Загрузка...</LoadingMessage>}
      {error && <ErrorMessage>Ошибка загрузки</ErrorMessage>}
      {!loading && !error && <DoctorList doctors={doctors} />}
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={loadPage}
      />
    </Wrapper>
  );
};

export default DoctorsPage; 