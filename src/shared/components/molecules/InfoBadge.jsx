import React from 'react';
import styled from 'styled-components';

const Badge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: 2px 10px;
  font-size: var(--font-xs);
  margin-right: 6px;
`;

const InfoBadge = ({ children }) => <Badge>{children}</Badge>;

export default InfoBadge; 