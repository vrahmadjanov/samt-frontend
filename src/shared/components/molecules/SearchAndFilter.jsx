import React, { memo } from 'react';
import styled from 'styled-components';
import SearchInputComponent from '../atoms/SearchInput';
import FilterButton from '../atoms/FilterButton';

const Container = styled.div`
  display: flex;
  gap: var(--gap-md);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--spacing-lg);
`;

const SearchSection = styled.div`
  flex: 9;
  width: 100%;
`;

const FilterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const SearchAndFilter = memo(({ 
  searchValue, 
  onSearchChange, 
  onSearchSubmit,
  isFilterActive = false, 
  onFilterClick, 
  searchPlaceholder = "Поиск врачей...",
  ...props 
}) => {
  return (
    <Container {...props}>
      <SearchSection>
        <SearchInputComponent
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          placeholder={searchPlaceholder}
        />
      </SearchSection>
      <FilterSection>
        <FilterButton
          isActive={isFilterActive}
          onClick={onFilterClick}
        />
      </FilterSection>
    </Container>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.searchValue === nextProps.searchValue &&
    prevProps.isFilterActive === nextProps.isFilterActive &&
    prevProps.searchPlaceholder === nextProps.searchPlaceholder
  );
});

export default SearchAndFilter; 