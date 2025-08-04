import React from 'react';
import styled from 'styled-components';

const StyledCardName = styled.div`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CardName = ({ children, ...props }) => (
  <StyledCardName {...props}>
    {children}
  </StyledCardName>
);

export default CardName; 