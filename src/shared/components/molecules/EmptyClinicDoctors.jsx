import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/NotFound.svg';

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


const EmptyClinicDoctors = memo(() => {
  const { t } = useTranslation();
  return (
    <Wrap>
      <Card>
        <IconBadge>
          <NotFoundIcon />
        </IconBadge>
        <Title>{t('clinics.doctorsNotFound') || 'Врачи данной клиники не найдены'}</Title>
      </Card>
    </Wrap>
  );
});

export default EmptyClinicDoctors;


