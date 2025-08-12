import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';
import InfoBadge from '../molecules/InfoBadge';
import { ReactComponent as DiplomaIcon } from '../../assets/icons/Diploma.svg';

const EducationCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: var(--spacing-md);
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  margin-bottom: var(--spacing-sm);
`;

const CardRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
`;

const LeftIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary + '10'};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  display: grid;
  gap: var(--spacing-xs);
  flex: 1;
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

const MetaBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
`;

const DoctorEducationSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.educations || doctor.educations.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.education')}>
      {doctor.educations.map((education) => (
        <EducationCard key={education.id}>
          <CardRow>
            <LeftIcon>
              <DiplomaIcon />
            </LeftIcon>
            <Content>
              <UniversityName>{education.university.name}</UniversityName>
              <UniversityLocation>
                {education.university.city}, {education.university.country}
              </UniversityLocation>
              <MetaBadges>
                {education.university.short_name && (
                  <InfoBadge>{education.university.short_name}</InfoBadge>
                )}
                {education.specialty && (
                  <InfoBadge>
                    {t('doctor.specialty')}: {education.specialty}
                  </InfoBadge>
                )}
                {education.graduation_year && (
                  <InfoBadge>
                    {t('doctor.graduationYear')}: {education.graduation_year}
                  </InfoBadge>
                )}
              </MetaBadges>
            </Content>
          </CardRow>
        </EducationCard>
      ))}
    </Section>
  );
};

export default DoctorEducationSection; 