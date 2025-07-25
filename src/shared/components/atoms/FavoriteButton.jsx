import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarIcon } from '../../assets/icons/FavouriteButton.svg';
import { ReactComponent as StarActiveIcon } from '../../assets/icons/FavouriteButtonActive.svg';

const Btn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s;
  &:active {
    transform: scale(0.95);
  }
  svg {
    width: 34px;
    height: 34px;
    display: block;
  }
`;

const FavoriteButton = ({ active, onClick, ...props }) => (
  <Btn onClick={onClick} aria-label={active ? 'В избранном' : 'Добавить в избранное'} {...props}>
    {active ? <StarActiveIcon /> : <StarIcon />}
  </Btn>
);

export default FavoriteButton; 