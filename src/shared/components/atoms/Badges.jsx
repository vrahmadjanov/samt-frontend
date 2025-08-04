import React from 'react';
import styled from 'styled-components';

const StyledBadges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badges = ({ children, ...props }) => (
  <StyledBadges {...props}>
    {children}
  </StyledBadges>
);

export default Badges; 