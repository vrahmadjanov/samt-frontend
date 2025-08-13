import React, { memo } from 'react';
import styled, { css } from 'styled-components';

const sizeStyles = {
  sm: css`
    width: 36px;
    height: 36px;
    svg { width: 18px; height: 18px; }
  `,
  md: css`
    width: 42px;
    height: 42px;
    svg { width: 20px; height: 20px; }
  `,
  lg: css`
    width: 48px;
    height: 48px;
    svg { width: 22px; height: 22px; }
  `,
};

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};

  ${({ $size }) => sizeStyles[$size || 'md']}

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.hover.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg { display: block; color: ${({ theme }) => theme.colors.textLight}; }
`;

const IconButton = memo(({ children, onClick, title, ariaLabel, size = 'md', disabled = false, className }) => (
  <StyledButton
    type="button"
    onClick={onClick}
    title={title}
    aria-label={ariaLabel || title}
    $size={size}
    disabled={disabled}
    className={className}
  >
    {children}
  </StyledButton>
));

export default IconButton;


