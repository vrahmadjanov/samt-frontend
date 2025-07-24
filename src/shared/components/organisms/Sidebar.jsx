import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <>
      <BurgerButton
        onClick={handleToggle}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="sidebar-menu"
        open={open}
      >
        <span />
        <span />
        <span />
      </BurgerButton>
      <SidebarOverlay open={open} onClick={handleClose} />
      <SidebarWrapper open={open} id="sidebar-menu" aria-hidden={!open && window.innerWidth < 901}>
        <NavList>
          <NavItem to="/" end onClick={handleClose}>Главная</NavItem>
          {/* Добавьте другие пункты меню по мере необходимости */}
        </NavList>
        <SidebarFooter>
          <ProfileButton aria-label="Профиль пользователя">Профиль</ProfileButton>
          <LogoutButton aria-label="Выйти из аккаунта">Выйти</LogoutButton>
        </SidebarFooter>
      </SidebarWrapper>
    </>
  );
};

const SidebarWrapper = styled.aside`
  width: 240px;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.white};
  border-right: 1.5px solid ${({ theme }) => theme.colors.border};
  height: 100vh;
  padding-top: ${({ theme }) => theme.spacing.xl};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 32px rgba(59,130,246,0.08);
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(.4,0,.2,1);
  @media (min-width: 901px) {
    position: sticky;
    top: 56px;
    left: 0;
    transform: none;
    box-shadow: none;
    z-index: 100;
    display: flex;
  }
  ${({ open }) => open && css`
    transform: translateX(0);
    box-shadow: 0 0 0 100vw rgba(0,0,0,0.2);
  `}
`;

const SidebarOverlay = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(59,130,246,0.10);
  z-index: 150;
  transition: background 0.3s;
  @media (min-width: 901px) {
    display: none;
  }
`;

const BurgerButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 300;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  transition: border-color 0.2s, box-shadow 0.2s;
  @media (min-width: 901px) {
    display: none;
  }
  span {
    display: block;
    width: 26px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(.4,0,.2,1);
    position: relative;
  }
  ${({ open }) => open && css`
    span:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }
  `}
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background 0.2s, color 0.2s;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProfileButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 1.1rem;
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 1.1rem;
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #b91c1c;
  }
`;

export default Sidebar; 