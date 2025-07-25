import React from 'react';
import styled from 'styled-components';
import BurgerButton from '../atoms/BurgerButton';

const HeaderWrapper = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--font-header);
  font-weight: ${({ theme }) => theme.font.weightBold};
  letter-spacing: 1px;
  padding: 0 var(--spacing-lg);
  box-sizing: border-box;
  overflow-x: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: ${({ theme }) => theme.headerHeightMobile};
    padding: 0 var(--spacing-md);
  }
`;

const Brand = styled.div`
  flex: 1;
  text-align: left;
  font-size: var(--font-header);
  font-weight: ${({ theme }) => theme.font.weightBold};
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 1px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    pointer-events: none;
  }
`;

const BurgerContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.header + 1};
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
    <Brand>SAMT</Brand>
  </HeaderWrapper>
);

export default Header; 