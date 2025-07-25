import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarIcon } from '../../assets/icons/Star.svg';

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Star = styled(StarIcon)`
  width: 22px;
  height: 22px;
  fill: ${({ theme }) => theme.colors.accent};
  opacity: ${({ $active }) => ($active ? 1 : 0.2)};
`;

function getStarCount(rating) {
  if (rating >= 4.5) return 5;
  if (rating >= 3.6) return 4;
  if (rating >= 2.8) return 3;
  if (rating >= 2.0) return 2;
  if (rating > 0) return 1;
  return 0;
}

const RatingStars = ({ rating }) => {
  const count = getStarCount(rating);
  return (
    <Stars>
      {[1,2,3,4,5].map(i => (
        <Star key={i} $active={i <= count} />
      ))}
    </Stars>
  );
};

export default RatingStars; 