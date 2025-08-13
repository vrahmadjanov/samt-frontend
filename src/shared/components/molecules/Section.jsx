import React, { memo } from 'react';
import styled from 'styled-components';

const SectionWrap = styled.section`
  background: ${({ theme, $frameless }) => ($frameless ? 'transparent' : theme.colors.surface)};
  border-radius: ${({ theme, $frameless }) => ($frameless ? 0 : theme.radius.lg)};
  box-shadow: ${({ theme, $noShadow, $frameless }) => ($frameless || $noShadow ? theme.shadow.none : theme.shadow.card)};
  padding: ${({ $frameless, $compact }) => ($frameless ? '0' : $compact ? 'var(--spacing-md)' : 'var(--spacing-lg)')};
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  min-height: 48px; /* фиксируем высоту заголовка для стабильности каркаса */
`;

const SectionTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;
  display: flex;
  align-items: center;
  min-height: 32px; /* минимальная высота текста заголовка */
`;

const SectionContent = styled.div``;

const Section = memo(({ title, actions, children, compact = false, frameless = false, noShadow = false }) => (
  <SectionWrap $compact={compact} $frameless={frameless} $noShadow={noShadow}>
    {(title || actions) && (
      <SectionHeader>
        {title && <SectionTitle>{title}</SectionTitle>}
        {actions || null}
      </SectionHeader>
    )}
    <SectionContent>{children}</SectionContent>
  </SectionWrap>
));

export default Section;


