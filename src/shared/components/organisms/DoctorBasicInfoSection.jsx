import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';

const Section = styled.div`
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

const SectionTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-md);
`;

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
    <Section>
      <SectionTitle>{t('doctor.basicInfo')}</SectionTitle>
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