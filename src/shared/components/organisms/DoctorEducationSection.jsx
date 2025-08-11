import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';

const EducationCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: var(--spacing-md);
  background: ${({ theme }) => theme.colors.white};
  margin-bottom: var(--spacing-sm);
`;

const UniversityName = styled.h4`
  font-size: var(--font-base);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 var(--spacing-xs) 0;
`;

const UniversityLocation = styled.p`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 var(--spacing-sm) 0;
`;

const EducationInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

const DoctorEducationSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.educations || doctor.educations.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.education')}>
      {doctor.educations.map(education => (
        <EducationCard key={education.id}>
          <UniversityName>{education.university.name}</UniversityName>
          <UniversityLocation>
            {education.university.city}, {education.university.country}
          </UniversityLocation>
          <EducationInfo>
            <InfoItem>
              <InfoLabel>{t('doctor.specialty')}</InfoLabel>
              <InfoValue>{education.specialty}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>{t('doctor.graduationYear')}</InfoLabel>
              <InfoValue>{education.graduation_year}</InfoValue>
            </InfoItem>
          </EducationInfo>
        </EducationCard>
      ))}
    </Section>
  );
};

export default DoctorEducationSection; 