import React from 'react';
import styled, { css } from 'styled-components';
import MenuItem from '../atoms/MenuItem';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';
import { ReactComponent as FavouriteIcon } from '../../assets/icons/Favourite.svg';
import { ReactComponent as PaymentIcon } from '../../assets/icons/Payment.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/Settings.svg';
import { ReactComponent as HelpIcon } from '../../assets/icons/Help.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/Logout.svg';
import { ReactComponent as DoctorIcon } from '../../assets/icons/Doctor.svg';
import { ReactComponent as ClinicIcon } from '../../assets/icons/Clinic.svg';
import authService from '../../../entities/user/service';
import LanguageSwitcher from '../../../features/i18n/ui/LanguageSwitcher';
import { useTranslation } from '../../../shared/i18n/useTranslation';

const SidebarWrapper = styled.div`
  width: 270px;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.sidebar};
  height: 100%;
  padding: var(--spacing-lg) 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.sidebar - 10};
  transition: transform ${({ theme }) => theme.transition.normal};
  box-sizing: border-box;
  
  /* Создаем эффект приподнятости */
  box-shadow: ${({ theme }) => theme.shadow.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: ${({ theme }) => theme.headerHeight};
    left: 0;
    height: calc(100vh - ${({ theme }) => theme.headerHeight});
    width: 320px;
    max-width: 85vw;
    transform: translateX(-100%);
    overflow-y: auto;
    border-right: none;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    
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
  position: relative;
  z-index: 1;
`;

const Sidebar = ({ open, onClose }) => {
  const { t, language } = useTranslation();
  
  const handleLogout = () => {
    authService.logout();
  };

  const handleMenuItemClick = () => {
    // Закрываем меню при клике на пункт меню только на мобильных устройствах
    if (window.innerWidth <= 900) { // tablet breakpoint
      onClose?.();
    }
  };

  return (
    <SidebarWrapper open={open}>
      <Menu>
        <MenuItem key={`profile-${language}`} icon={ProfileIcon} onClick={handleMenuItemClick}>{t('navigation.profile')}</MenuItem>
        <MenuItem key={`doctors-${language}`} to="/doctors" icon={DoctorIcon} onClick={handleMenuItemClick}>{t('navigation.doctors')}</MenuItem>
        <MenuItem key={`clinics-${language}`} to="/clinics" icon={ClinicIcon} onClick={handleMenuItemClick}>{t('navigation.clinics')}</MenuItem>
        <MenuItem key={`favorites-${language}`} icon={FavouriteIcon} onClick={handleMenuItemClick}>{t('navigation.favorites')}</MenuItem>
        <MenuItem key={`payments-${language}`} icon={PaymentIcon} onClick={handleMenuItemClick}>{t('navigation.payments')}</MenuItem>
        <MenuItem key={`settings-${language}`} icon={SettingsIcon} onClick={handleMenuItemClick}>{t('navigation.settings')}</MenuItem>
        <MenuItem key={`help-${language}`} icon={HelpIcon} onClick={handleMenuItemClick}>{t('navigation.help')}</MenuItem>
        <LanguageSwitcher onMenuClose={onClose} />
        <MenuItem key={`logout-${language}`} icon={LogoutIcon} onClick={() => {
          handleLogout();
          handleMenuItemClick();
        }}>{t('navigation.logout')}</MenuItem>
      </Menu>
    </SidebarWrapper>
  );
};

export default Sidebar; 