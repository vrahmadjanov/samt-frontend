import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Base = styled.div`
  display: inline-block;
  border-radius: ${({ $circle, theme }) => ($circle ? '50%' : theme.radius.md)};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray[100]} 0%,
    ${({ theme }) => theme.colors.gray[50]} 50%,
    ${({ theme }) => theme.colors.gray[100]} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  ${({ $width }) => $width && css`width: ${typeof $width === 'number' ? `${$width}px` : $width};`}
  ${({ $height }) => $height && css`height: ${typeof $height === 'number' ? `${$height}px` : $height};`}
`;

const Skeleton = memo(({ width = '100%', height = 12, circle = false, style, className }) => (
  <Base $width={width} $height={height} $circle={circle} style={style} className={className} />
));

export default Skeleton;


