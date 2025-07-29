import React from 'react';
import styled from 'styled-components';

const LoadingMessageWrapper = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-lg);
`;

const LoadingMessage = ({ children }) => {
  return <LoadingMessageWrapper>{children}</LoadingMessageWrapper>;
};

export default LoadingMessage; 