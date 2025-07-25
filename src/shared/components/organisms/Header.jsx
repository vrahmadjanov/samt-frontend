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
  font-size: ${({ theme }) => theme.font.header};
  font-weight: ${({ theme }) => theme.font.weightBold};
  letter-spacing: 1px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.header};
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Brand = styled.div`
  flex: 1;
  text-align: left;
  font-size: ${({ theme }) => theme.font.header};
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