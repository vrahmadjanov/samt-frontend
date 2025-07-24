import React from 'react';
import styled from 'styled-components';

const Header = () => (
  <HeaderWrapper>
    <Logo tabIndex={0} aria-label="Главная страница">CAMT</Logo>
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  width: 100%;
  height: 68px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(59,130,246,0.06);
  @media (max-width: 600px) {
    height: 60px;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1.5px;
  cursor: pointer;
  outline: none;
  transition: color 0.2s;
  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export default Header; 