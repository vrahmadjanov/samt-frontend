import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  width: 220px;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
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

const Sidebar = () => (
  <SidebarWrapper>
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