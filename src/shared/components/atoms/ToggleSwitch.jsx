import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 4px;
  position: relative;
  overflow: hidden;
`;

const ToggleOption = styled.button`
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-md);
  border: none;
  background: transparent;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.white : theme.colors.text};
  font-size: var(--font-base);
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  
  &:hover {
    background: ${({ theme, $isActive }) => 
      $isActive ? 'transparent' : theme.colors.primary + '08'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: ${({ $activeIndex }) => $activeIndex === 0 ? '4px' : '50%'};
  right: ${({ $activeIndex }) => $activeIndex === 1 ? '4px' : '50%'};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const ToggleSwitch = ({ 
  options = [], 
  activeIndex = 0, 
  onChange, 
  disabled = false,
  className 
}) => {
  const handleOptionClick = (index) => {
    if (!disabled && onChange) {
      onChange(index);
    }
  };

  return (
    <ToggleContainer className={className}>
      <ActiveIndicator $activeIndex={activeIndex} />
      {options.map((option, index) => (
        <ToggleOption
          key={index}
          $isActive={activeIndex === index}
          onClick={() => handleOptionClick(index)}
          disabled={disabled}
          type="button"
        >
          {option.label}
        </ToggleOption>
      ))}
    </ToggleContainer>
  );
};

export default ToggleSwitch;
