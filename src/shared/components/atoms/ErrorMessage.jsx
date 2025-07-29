import React from 'react';
import styled from 'styled-components';

const ErrorMessageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: var(--spacing-md);
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: var(--spacing-md);
  text-align: center;
  font-size: var(--font-base);
`;

const ErrorMessage = ({ children }) => {
  return <ErrorMessageWrapper>{children}</ErrorMessageWrapper>;
};

export default ErrorMessage; 