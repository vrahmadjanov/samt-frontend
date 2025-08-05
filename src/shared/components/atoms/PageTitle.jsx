import React, { memo } from 'react';
import styled from 'styled-components';

const PageTitleStyled = styled.h1`
  margin-bottom: var(--spacing-lg);
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-xl);
  font-weight: 600;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

const PageTitle = memo(({ children }) => {
  return <PageTitleStyled>{children}</PageTitleStyled>;
});

export default PageTitle; 