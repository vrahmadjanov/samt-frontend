import React, { memo } from 'react';
import styled from 'styled-components';
import SpecialtyIcon from '../atoms/SpecialtyIcon';

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 16px;
  padding: 2px 10px 2px 4px;
  font-size: var(--font-xs);
  color: ${({ theme }) => theme.colors.primary};
`;

const SpecialtyBadge = memo(({ icon, name }) => (
  <Badge>
    <SpecialtyIcon src={icon} alt={name} />
    {name}
  </Badge>
));

export default SpecialtyBadge; 