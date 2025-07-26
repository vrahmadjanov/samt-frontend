import React from 'react';
import styled from 'styled-components';
import FilterGroup from '../molecules/FilterGroup';
import Button from '../atoms/Button';

const FilterPanelWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterTitle = styled.h2`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterContent = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const FilterActions = styled.div`
  display: flex;
  gap: var(--gap-md);
  justify-content: flex-end;
  padding-top: var(--spacing-md);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const ResetButton = styled(Button)`
  background: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const FilterPanel = ({ 
  isOpen = false,
  filters = [],
  selectedFilters = {},
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  ...props 
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (groupId, optionId) => {
    if (onFilterChange) {
      onFilterChange(groupId, optionId);
    }
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(selectedFilters);
    }
  };

  const handleReset = () => {
    if (onResetFilters) {
      onResetFilters();
    }
  };

  return (
    <FilterPanelWrapper {...props}>
      <FilterTitle>Фильтры</FilterTitle>
      
      <FilterContent>
        {filters.map((filterGroup) => (
          <FilterGroup
            key={filterGroup.id}
            title={filterGroup.title}
            options={filterGroup.options}
            name={filterGroup.id}
            selectedOption={selectedFilters[filterGroup.id] || null}
            onOptionChange={(optionId) => 
              handleFilterChange(filterGroup.id, optionId)
            }
          />
        ))}
      </FilterContent>

      <FilterActions>
        <ResetButton onClick={handleReset}>
          Сбросить
        </ResetButton>
        <Button onClick={handleApply}>
          Применить
        </Button>
      </FilterActions>
    </FilterPanelWrapper>
  );
};

export default FilterPanel; 