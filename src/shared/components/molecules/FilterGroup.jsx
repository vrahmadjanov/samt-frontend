import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import FilterOption from '../atoms/FilterOption';

const FilterGroupWrapper = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const GroupTitle = styled.h3`
  font-size: var(--font-base);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-sm);
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterGroup = memo(({ 
  title, 
  options = [], 
  selectedOption = null, 
  onOptionChange,
  name,
  ...props 
}) => {
  const handleOptionChange = useCallback((optionId) => {
    if (onOptionChange) {
      onOptionChange(optionId);
    }
  }, [onOptionChange]);

  return (
    <FilterGroupWrapper {...props}>
      <GroupTitle>{title}</GroupTitle>
      <OptionsContainer>
        {options.map((option) => (
          <FilterOption
            key={option.id}
            id={option.id}
            name={name}
            label={option.label}
            checked={selectedOption === option.id}
            onChange={() => handleOptionChange(option.id)}
          />
        ))}
      </OptionsContainer>
    </FilterGroupWrapper>
  );
});

export default FilterGroup; 