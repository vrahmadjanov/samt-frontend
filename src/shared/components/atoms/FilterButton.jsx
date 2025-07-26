import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FilterIcon } from '../../assets/icons/Filter.svg';
import { ReactComponent as FilterActiveIcon } from '../../assets/icons/FilterActive.svg';

const FilterButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.border : theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.white : theme.colors.primary};
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.text : theme.colors.white};
  font-size: var(--font-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  width: 44px;
  height: 44px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme, $isActive }) => 
      $isActive ? theme.colors.backgroundSecondary : theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    width: 18px;
    height: 18px;
    display: block;
    flex-shrink: 0;
  }
`;

const FilterButton = ({ isActive = false, onClick, ...props }) => {
  return (
    <FilterButtonWrapper
      $isActive={isActive}
      onClick={onClick}
      {...props}
    >
      {isActive ? <FilterActiveIcon /> : <FilterIcon />}
    </FilterButtonWrapper>
  );
};

export default FilterButton; 