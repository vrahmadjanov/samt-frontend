import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled.li`
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
  &:hover, &:has(a:hover) {
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

const MenuLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
  text-decoration: none;
  width: 100%;
  height: 100%;
  background: none;
  gap: var(--gap-sm);
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:focus {
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;

const Label = styled.span`
  flex: 1;
  transition: color ${({ theme }) => theme.transition.fast};
`;

const MenuItem = ({ icon: Icon, children, to, onClick, ...props }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Item {...props} onClick={handleClick}>
      {to ? (
        <MenuLink to={to} tabIndex={0}>
          {Icon && <Icon />}
          <Label>{children}</Label>
        </MenuLink>
      ) : (
        <>
          {Icon && <Icon />}
          <Label>{children}</Label>
        </>
      )}
    </Item>
  );
};

export default MenuItem; 