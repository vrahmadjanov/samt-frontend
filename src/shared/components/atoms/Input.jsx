import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.font.base};
  color: ${({ theme }) => theme.colors.label};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyledInput = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.font.base};
  transition: 0.2s border-color;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Input = ({ label, ...props }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledInput {...props} />
  </Wrapper>
);

export default Input;