import React from 'react';
import { StyledSelect, Label, Wrapper } from './Select.styled';

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
