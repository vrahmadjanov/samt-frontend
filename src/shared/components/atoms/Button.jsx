import React, { memo } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 18px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: var(--font-base);
  font-weight: 500;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const Button = memo(({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
));

export default Button;
