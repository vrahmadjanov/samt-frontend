import React from 'react';
import styled from 'styled-components';
import Label from './Label';
import FormWrapper from './FormWrapper';

const StyledInput = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: var(--font-base);
  transition: 0.2s border-color;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Input = ({ label, ...props }) => (
  <FormWrapper>
    {label && <Label>{label}</Label>}
    <StyledInput {...props} />
  </FormWrapper>
);

export default Input;