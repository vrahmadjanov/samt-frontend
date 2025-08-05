import React, { memo } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
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

const SearchInputComponent = memo(({ value, onChange, onSubmit, placeholder = "Поиск врачей...", ...props }) => {
  const isActive = value && value.length > 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        $isActive={isActive}
        {...props}
      />
    </SearchWrapper>
  );
});

export default SearchInputComponent; 