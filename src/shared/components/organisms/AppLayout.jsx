import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => (
  <LayoutWrapper>
    <Header />
    <MainArea>
      <Sidebar />
      <Content>{children}</Content>
    </MainArea>
  </LayoutWrapper>
);

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundGradient};
`;

const MainArea = styled.div`
  display: flex;
  min-height: calc(100vh - 68px);
  @media (max-width: 900px) {
    min-height: calc(100vh - 60px);
  }
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  @media (max-width: 600px) {
    padding: ${({ theme }) => theme.spacing.sm};
    width: 100vw;
    min-width: 0;
  }
`;

export default AppLayout; 