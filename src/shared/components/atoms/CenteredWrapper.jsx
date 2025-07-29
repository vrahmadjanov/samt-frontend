import React from 'react';
import styled from 'styled-components';

const CenteredWrapperStyled = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

const CenteredWrapper = ({ children }) => {
  return <CenteredWrapperStyled>{children}</CenteredWrapperStyled>;
};

export default CenteredWrapper; 