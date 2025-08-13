import React, { memo } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

const SectionSkeleton = memo(({ children }) => <Wrap>{children}</Wrap>);

export default SectionSkeleton;


