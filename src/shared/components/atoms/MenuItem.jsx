import React from 'react';
import styled from 'styled-components';

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
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: block;
  }
`;

const Label = styled.span`
  flex: 1;
`;

const MenuItem = ({ icon: Icon, children, ...props }) => (
  <Item {...props}>
    {Icon && <Icon />}
    <Label>{children}</Label>
  </Item>
);

export default MenuItem; 