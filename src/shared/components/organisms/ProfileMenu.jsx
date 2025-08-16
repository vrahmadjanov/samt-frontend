import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import { useLanguage } from '../../../features/i18n/model/useLanguage';
import authService from '../../../entities/user/service';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';
import { ReactComponent as CaseIcon } from '../../assets/icons/Case.svg';
import { ReactComponent as SubscriptionIcon } from '../../assets/icons/Payment.svg';
import { ReactComponent as FavouriteIcon } from '../../assets/icons/Favorite.svg';
import { ReactComponent as SupportIcon } from '../../assets/icons/Help.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/Info.svg';
import { ReactComponent as FAQIcon } from '../../assets/icons/FAQ.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/Bell.svg';
import { ReactComponent as LanguageIcon } from '../../assets/icons/Translate.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/Logout.svg';

const MenuSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-md);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 28px;
    height: 28px;
    margin-right: var(--spacing-lg);
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 20px;
    height: 20px;
    margin-right: var(--spacing-sm);
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const MenuText = styled.span`
  flex: 1;
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const MenuArrow = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 6px;
    height: 6px;
    border-right: 2px solid ${({ theme }) => theme.colors.textLight};
    border-top: 2px solid ${({ theme }) => theme.colors.textLight};
    transform: rotate(45deg);
  }
`;

const LogoutItem = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.error};
  
  ${MenuText} {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const ProfileMenu = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const handleItemClick = (route) => {
    onNavigate(route);
  };

  const handleLanguageToggle = () => {
    // Переключаем между русским и таджикским
    const newLanguage = language === 'ru' ? 'tg' : 'ru';
    changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <>
      {/* Личное */}
      <MenuSection>
        <SectionTitle>{t('profile.personal')}</SectionTitle>
        <MenuList>
          <MenuItem onClick={() => handleItemClick('/profile/details')}>
            <MenuIcon>
              <ProfileIcon />
            </MenuIcon>
            <MenuText>{t('profile.myProfile')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <MenuItem onClick={() => handleItemClick('/profile/professional')}>
            <MenuIcon>
              <CaseIcon />
            </MenuIcon>
            <MenuText>{t('profile.professionalAccount')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <MenuItem onClick={() => handleItemClick('/profile/subscriptions')}>
            <MenuIcon>
              <SubscriptionIcon />
            </MenuIcon>
            <MenuText>{t('profile.mySubscriptions')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <MenuItem onClick={() => handleItemClick('/profile/favorites')}>
            <MenuIcon>
              <FavouriteIcon />
            </MenuIcon>
            <MenuText>{t('profile.favorites')}</MenuText>
            <MenuArrow />
          </MenuItem>
        </MenuList>
      </MenuSection>

      {/* Коммуникации */}
      <MenuSection>
        <SectionTitle>{t('profile.communication')}</SectionTitle>
        <MenuList>
          <MenuItem onClick={() => handleItemClick('/profile/support')}>
            <MenuIcon>
              <SupportIcon />
            </MenuIcon>
            <MenuText>{t('profile.support')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <MenuItem onClick={() => handleItemClick('/profile/about')}>
            <MenuIcon>
              <InfoIcon />
            </MenuIcon>
            <MenuText>{t('profile.aboutApp')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <MenuItem onClick={() => handleItemClick('/profile/faq')}>
            <MenuIcon>
              <FAQIcon />
            </MenuIcon>
            <MenuText>{t('profile.faq')}</MenuText>
            <MenuArrow />
          </MenuItem>
        </MenuList>
      </MenuSection>

      {/* Настройки */}
      <MenuSection>
        <SectionTitle>{t('profile.settings')}</SectionTitle>
        <MenuList>
          <MenuItem onClick={() => handleItemClick('/profile/notifications')}>
            <MenuIcon>
              <NotificationIcon />
            </MenuIcon>
            <MenuText>{t('profile.notifications')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <MenuItem onClick={handleLanguageToggle}>
            <MenuIcon>
              <LanguageIcon />
            </MenuIcon>
            <MenuText>{t('profile.language')}</MenuText>
            <MenuArrow />
          </MenuItem>
          <LogoutItem onClick={handleLogout}>
            <MenuIcon>
              <LogoutIcon />
            </MenuIcon>
            <MenuText>{t('profile.logout')}</MenuText>
            <MenuArrow />
          </LogoutItem>
        </MenuList>
      </MenuSection>
    </>
  );
};

export default ProfileMenu; 