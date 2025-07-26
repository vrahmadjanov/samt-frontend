import React from 'react';
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

const SearchAndFilter = ({ 
  searchValue, 
  onSearchChange, 
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
};

export default SearchAndFilter; 