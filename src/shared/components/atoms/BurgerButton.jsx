import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  transition: border-color ${({ theme }) => theme.transition.fast}, box-shadow ${({ theme }) => theme.transition.fast};
  z-index: ${({ theme }) => theme.zIndex.header + 1};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  width: 26px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  transition: all ${({ theme }) => theme.transition.fast};
  position: relative;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 20px;
    height: 3px;
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
`;

const BurgerButton = ({ open, onClick, ...props }) => {
  const isMobile = window.innerWidth <= 600;
  const translateY = isMobile ? '7px' : '9px';
  
  return (
    <Button onClick={onClick} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} {...props}>
      <Line style={open ? { transform: `translateY(${translateY}) rotate(45deg)` } : {}} />
      <Line style={open ? { opacity: 0 } : {}} />
      <Line style={open ? { transform: `translateY(-${translateY}) rotate(-45deg)` } : {}} />
    </Button>
  );
};

export default BurgerButton; 