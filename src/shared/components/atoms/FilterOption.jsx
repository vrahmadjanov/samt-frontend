import React from 'react';
import styled from 'styled-components';

const FilterOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Radio = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const Label = styled.label`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
`;

const FilterOption = ({ 
  id, 
  name,
  label, 
  checked = false, 
  onChange, 
  ...props 
}) => {
  return (
    <FilterOptionWrapper {...props}>
      <Radio
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={() => onChange(true)}
      />
      <Label htmlFor={id}>{label}</Label>
    </FilterOptionWrapper>
  );
};

export default FilterOption; 