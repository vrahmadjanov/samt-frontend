import React from 'react';
import styled, { css } from 'styled-components';
import MenuItem from '../atoms/MenuItem';
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

const Sidebar = ({ open }) => (
  <SidebarWrapper open={open}>
    <Menu>
      <MenuItem icon={ProfileIcon}>Профиль</MenuItem>
      <MenuItem icon={FavouriteIcon}>Избранное</MenuItem>
      <MenuItem icon={PaymentIcon}>Платежи</MenuItem>
      <MenuItem icon={SettingsIcon}>Настройки</MenuItem>
      <MenuItem icon={HelpIcon}>Помощь</MenuItem>
      <MenuItem icon={LogoutIcon}>Выйти</MenuItem>
    </Menu>
  </SidebarWrapper>
);

export default Sidebar; 