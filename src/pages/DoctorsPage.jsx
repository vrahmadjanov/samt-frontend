import React, { useState } from 'react';
import { useDoctors } from '../features/doctor/model/useDoctors';
import DoctorList from '../shared/components/organisms/DoctorList';
import SearchAndFilter from '../shared/components/molecules/SearchAndFilter';
import styled from 'styled-components';
import Pagination from '../shared/components/organisms/Pagination';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
`;

const PageTitle = styled.h1`
  margin-bottom: var(--spacing-lg);
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-xl);
  font-weight: 600;
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
  const { doctors, page, totalPages, loading, error, loadPage } = useDoctors();
  const [searchValue, setSearchValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // TODO: Добавить логику поиска
  };

  const handleFilterClick = () => {
    setIsFilterActive(!isFilterActive);
    // TODO: Добавить логику фильтрации
  };

  return (
    <Wrapper>
      <PageTitle>Врачи</PageTitle>
      
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        isFilterActive={isFilterActive}
        onFilterClick={handleFilterClick}
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