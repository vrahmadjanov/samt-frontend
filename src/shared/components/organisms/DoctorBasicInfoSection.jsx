import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const InfoLabel = styled.span`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const DoctorBasicInfoSection = ({ doctor }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Section title={t('doctor.basicInfo')}>
      <InfoGrid>
        <InfoItem>
          <InfoLabel>{t('doctor.birthDate')}</InfoLabel>
          <InfoValue>{formatDate(doctor.date_of_birth)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{t('doctor.gender')}</InfoLabel>
          <InfoValue>{doctor.gender.name}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{t('doctor.district')}</InfoLabel>
          <InfoValue>{doctor.district.name}, {doctor.district.region.name}</InfoValue>
        </InfoItem>

      </InfoGrid>
    </Section>
  );
};

export default DoctorBasicInfoSection; 