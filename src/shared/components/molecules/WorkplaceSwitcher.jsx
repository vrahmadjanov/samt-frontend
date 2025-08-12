import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

const SwitcherWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding: var(--spacing-xs) 0;
  margin-bottom: var(--spacing-sm);
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const PillButton = styled.button`
  appearance: none;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.white)};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px 10px;
  font-size: var(--font-xs);
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.primary + '08')};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 10px 10px;
  }
`;

const WorkplaceSwitcher = memo(({ workplaces = [], selectedId, onSelect }) => {
  const items = useMemo(
    () => workplaces.map((w) => ({ id: w.id, label: w.clinic?.name || `#${w.id}`, data: w })),
    [workplaces]
  );

  return (
    <SwitcherWrap role="tablist" aria-label="workplace switcher">
      {items.map((item) => (
        <PillButton
          key={item.id}
          role="tab"
          aria-selected={item.id === selectedId}
          $active={item.id === selectedId}
          onClick={() => onSelect?.(item.data)}
        >
          {item.label}
        </PillButton>
      ))}
    </SwitcherWrap>
  );
});

export default WorkplaceSwitcher;


