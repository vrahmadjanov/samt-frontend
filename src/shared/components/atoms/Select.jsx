import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
`;

const Label = styled.label`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.label};
  margin-bottom: var(--spacing-sm);
`;

const StyledSelect = styled.select`
  padding: 10px 36px 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: var(--font-base);
  transition: 0.2s border-color;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6 8L10 12L14 8" stroke="%234B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px 20px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Select = ({ label, options = [], ...props }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledSelect {...props}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  </Wrapper>
);

export default Select;
