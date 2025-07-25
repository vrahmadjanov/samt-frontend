import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: var(--font-sm);
  font-weight: ${({ theme }) => theme.font.weight.regular};
  transition: background 0.2s;
  background: transparent;
  border: none;
  list-style: none;
  &:hover, &:has(a:hover) {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
  svg {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: block;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: var(--font-lg);
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
`;

const Label = styled.span`
  flex: 1;
`;

const MenuItem = ({ icon: Icon, children, to, ...props }) => (
  <Item {...props}>
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

export default MenuItem; 