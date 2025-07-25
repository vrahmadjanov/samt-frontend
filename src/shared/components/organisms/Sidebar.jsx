import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';
import { ReactComponent as FavouriteIcon } from '../../assets/icons/Favourite.svg';
import { ReactComponent as PaymentIcon } from '../../assets/icons/Payment.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/Settings.svg';
import { ReactComponent as HelpIcon } from '../../assets/icons/Help.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/Logout.svg';

const SidebarWrapper = styled.div`
  width: 220px;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.white};
  height: 100%;
  padding: var(--spacing-lg) 0;
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
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${({ theme }) => theme.headerHeightMobile};
    height: calc(100vh - ${({ theme }) => theme.headerHeightMobile});
    padding: var(--spacing-md) 0;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: var(--font-sm);
  font-weight: ${({ theme }) => theme.font.weight.regular};
  transition: background 0.2s;
  background: transparent;
  border: none;
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: block;
  }
`;

const Label = styled.span`
  flex: 1;
`;

const Sidebar = ({ open }) => (
  <SidebarWrapper open={open}>
    <Menu>
      <MenuItem><ProfileIcon /> <Label>Профиль</Label></MenuItem>
      <MenuItem><FavouriteIcon /> <Label>Избранное</Label></MenuItem>
      <MenuItem><PaymentIcon /> <Label>Платежи</Label></MenuItem>
      <MenuItem><SettingsIcon /> <Label>Настройки</Label></MenuItem>
      <MenuItem><HelpIcon /> <Label>Помощь</Label></MenuItem>
      <MenuItem><LogoutIcon /> <Label>Выйти</Label></MenuItem>
    </Menu>
  </SidebarWrapper>
);

export default Sidebar; 