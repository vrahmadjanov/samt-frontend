import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.label};
  margin-bottom: ${({ $noMargin }) => $noMargin ? '0' : 'var(--spacing-sm)'};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  user-select: ${({ $clickable }) => $clickable ? 'none' : 'auto'};
`;

const Label = ({ children, clickable = false, noMargin = false, ...props }) => (
  <StyledLabel $clickable={clickable} $noMargin={noMargin} {...props}>
    {children}
  </StyledLabel>
);

export default Label; 