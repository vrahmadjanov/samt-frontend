import React, { memo } from 'react';
import styled from 'styled-components';

const SectionWrap = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
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

const Section = memo(({ title, actions, children }) => (
  <SectionWrap>
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


