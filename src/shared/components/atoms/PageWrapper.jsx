import React, { memo } from 'react';
import styled from 'styled-components';

const PageWrapperStyled = styled.div`
  width: 100%;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: var(--spacing-xl) var(--spacing-md);
  }
`;

const PageWrapper = memo(({ children }) => {
  return <PageWrapperStyled>{children}</PageWrapperStyled>;
});

export default PageWrapper; 