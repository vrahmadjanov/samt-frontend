import React from 'react';
import styled from 'styled-components';
import BurgerButton from '../atoms/BurgerButton';
import logo from '../../../logo.png';

const HeaderWrapper = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--font-header);
  font-weight: ${({ theme }) => theme.font.weightBold};
  letter-spacing: 1px;
  padding: 0 var(--spacing-lg);
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.header};
  
  /* Создаем эффект приподнятости */
  box-shadow: ${({ theme }) => theme.shadow.header};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: ${({ theme }) => theme.headerHeightMobile};
    padding: 0 var(--spacing-md);
  }
`;

const Brand = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: var(--font-header);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1px;
  gap: var(--gap-sm);
  position: relative;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    pointer-events: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: var(--font-title);
    gap: var(--gap-md);
  }
`;

const LogoImg = styled.img`
  height: 56px;
  width: 56px;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 48px;
    width: 48px;
  }
`;

const BurgerContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.header + 1};
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & > button {
      width: 36px;
      height: 36px;
    }
    & > button span {
      width: 20px;
      height: 3px;
    }
  }
`;

const Header = ({ menuOpen, onMenuToggle }) => (
  <HeaderWrapper>
    <BurgerContainer>
      <BurgerButton open={menuOpen} onClick={onMenuToggle} />
    </BurgerContainer>
    <Brand>
      <LogoImg src={logo} alt="Логотип" />
      CAMT
    </Brand>
  </HeaderWrapper>
);

export default Header; 