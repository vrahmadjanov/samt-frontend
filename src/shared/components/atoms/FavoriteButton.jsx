import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarIcon } from '../../assets/icons/Favorite.svg';
import { ReactComponent as StarActiveIcon } from '../../assets/icons/FavoriteActive.svg';

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0;
  cursor: pointer;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.hover.surface};
    border-color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
    display: block;
    color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textLight};
  }
`;

const FavoriteButton = ({ active, onClick, ...props }) => (
  <Btn 
    $active={active}
    onClick={onClick} 
    aria-label={active ? 'В избранном' : 'Добавить в избранное'} 
    {...props}
  >
    {active ? <StarActiveIcon /> : <StarIcon />}
  </Btn>
);

export default FavoriteButton; 