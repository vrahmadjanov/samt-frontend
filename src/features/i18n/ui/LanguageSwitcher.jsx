import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../model/useLanguage';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { ReactComponent as TranslateIcon } from '../../../shared/assets/icons/Translate.svg';

const LanguageItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-sm);
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: all ${({ theme }) => theme.transition.fast};
  background: transparent;
  border: none;
  list-style: none;
  border-radius: ${({ theme }) => theme.radius.md};
  margin: 0 0;
  
  /* Улучшенные эффекты наведения */
  &:hover {
    background: ${({ theme }) => theme.colors.hover.surface};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
  
  svg {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: block;
    transition: all ${({ theme }) => theme.transition.fast};
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
  
  &:hover svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
    transform: scale(1.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: var(--font-lg);
    padding: var(--spacing-md) var(--spacing-lg);
    
    svg {
      width: 34px;
      height: 34px;
    }
  }
`;

const LanguageLabel = styled.span`
  flex: 1;
  transition: color ${({ theme }) => theme.transition.fast};
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const LanguageFlag = styled.span`
  font-size: var(--font-lg);
  line-height: 1;
`;

const LanguageSwitcher = ({ onMenuClose }) => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageToggle = () => {
    // Переключаем между русским и таджикским
    const newLanguage = language === 'ru' ? 'tg' : 'ru';
    changeLanguage(newLanguage);
    
    // Закрываем меню на мобильных устройствах
    if (window.innerWidth <= 900) {
      onMenuClose?.();
    }
  };

  return (
    <LanguageItem onClick={handleLanguageToggle}>
      <TranslateIcon />
      <LanguageLabel>
        {t('language.switch', 'Переключить язык')}
        <LanguageFlag>
          {language === 'ru' ? '🇷🇺' : '🇹🇯'}
        </LanguageFlag>
      </LanguageLabel>
    </LanguageItem>
  );
};

export default LanguageSwitcher; 