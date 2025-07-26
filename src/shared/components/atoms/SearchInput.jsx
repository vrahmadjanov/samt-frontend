import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 44px 12px 16px;
  border: 1px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: var(--font-base);
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  width: 20px;
  height: 20px;
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
    flex-shrink: 0;
  }
`;

const SearchInputComponent = ({ value, onChange, placeholder = "Поиск врачей...", ...props }) => {
  const isActive = value && value.length > 0;

  return (
    <SearchWrapper>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <SearchInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        $isActive={isActive}
        {...props}
      />
    </SearchWrapper>
  );
};

export default SearchInputComponent; 