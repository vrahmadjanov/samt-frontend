import React from 'react';
import styled from 'styled-components';

// Единый компонент названия сущности (врач, клиника и т.д.)
const StyledEntityName = styled.span`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const EntityName = ({ children, ...props }) => (
  <StyledEntityName {...props}>{children}</StyledEntityName>
);

export default EntityName;


