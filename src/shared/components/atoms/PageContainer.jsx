import React from 'react';
import styled from 'styled-components';

const PageContainerWrapper = styled.div`
  padding: var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
`;

const PageContainer = ({ children, maxWidth = '1200px' }) => {
  return (
    <PageContainerWrapper style={{ maxWidth }}>
      {children}
    </PageContainerWrapper>
  );
};

export default PageContainer; 