import React, { memo } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-sm);
`;

const IconBadge = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary + '10'};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  svg { width: 28px; height: 28px; display: block; }
`;

const Title = styled.div`
  font-size: var(--font-base);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.div`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
`;

const Actions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
`;

const EmptyState = memo(({ icon = null, title, subtitle, actions = null }) => (
  <Wrap>
    <Card>
      {icon ? <IconBadge>{icon}</IconBadge> : null}
      {title ? <Title>{title}</Title> : null}
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      {actions ? <Actions>{actions}</Actions> : null}
    </Card>
  </Wrap>
));

export default EmptyState;


