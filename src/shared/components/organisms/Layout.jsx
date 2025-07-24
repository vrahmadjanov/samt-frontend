import React from 'react';
import styled from 'styled-components';
import PageWrapper from './PageWrapper';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 32px 24px;
  min-width: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const SidebarContainer = styled.div`
  width: 220px;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => (
  <PageWrapper>
    <Header />
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Main>
        {children}
      </Main>
    </LayoutContainer>
    <Footer />
  </PageWrapper>
);

export default Layout; 