import React from 'react';
import styled, { css } from 'styled-components';

const SidebarWrapper = styled.div`
  width: 220px;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.sidebar - 10};
  transition: transform ${({ theme }) => theme.transition.normal};
  box-sizing: border-box;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: ${({ theme }) => theme.headerHeight};
    left: 0;
    height: calc(100vh - ${({ theme }) => theme.headerHeight});
    width: 280px;
    max-width: 85vw;
    transform: translateX(-100%);
    overflow-y: auto;
    ${({ open }) => open && css`
      transform: translateX(0);
    `}
    box-shadow: 4px 0 24px rgba(31,41,55,0.12);
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.md};
`;

const MenuItem = styled.li`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.base};
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }
`;

const Sidebar = ({ open }) => (
  <SidebarWrapper open={open}>
    <Menu>
      <MenuItem>Профиль</MenuItem>
      <MenuItem>Избранное</MenuItem>
      <MenuItem>Платежи</MenuItem>
      <MenuItem>Настройки</MenuItem>
      <MenuItem>Помощь</MenuItem>
    </Menu>
  </SidebarWrapper>
);

export default Sidebar; 