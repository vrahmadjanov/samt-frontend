import React, { memo } from 'react';
import styled from 'styled-components';

const Track = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 9999px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.4s ease;
`;

const ProgressBar = memo(({ value = 0, className }) => (
  <Track className={className}>
    <Fill value={value} />
  </Track>
));

export default ProgressBar;


