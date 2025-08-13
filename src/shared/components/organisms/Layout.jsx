import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PageWrapper from './PageWrapper';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding: var(--spacing-xl) var(--spacing-lg);
  min-width: 0;
  min-height: 0;
  background: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  position: relative;
  
  /* Создаем эффект глубины */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.background};
    z-index: -1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: var(--spacing-md);
  }
`;

const SidebarContainer = styled.div`
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: ${({ theme }) => theme.zIndex.sidebar};
  }
`;

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef(null);
  const location = useLocation();

  // Закрытие меню по Esc
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Блокировка скролла body при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Закрытие меню при клике вне (overlay реализован в Sidebar)
  const handleMenuToggle = useCallback(() => setMenuOpen((v) => !v), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);

  // Прокрутка основного контейнера к верху при смене маршрута
  useEffect(() => {
    if (!mainRef.current) return;
    // Если есть якорь в URL — не мешаем переходу к нему
    if (location.hash) return;
    mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return (
    <PageWrapper>
      <Header menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />
      <LayoutContainer>
        <SidebarContainer>
          <Sidebar open={menuOpen} onClose={handleMenuClose} />
        </SidebarContainer>
        <Main ref={mainRef}>
          {children}
        </Main>
      </LayoutContainer>
    </PageWrapper>
  );
};

export default Layout; 