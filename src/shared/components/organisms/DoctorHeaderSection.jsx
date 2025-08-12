import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import Section from '../molecules/Section';
import EntityName from '../atoms/EntityName';
import RatingStars from '../atoms/RatingStars';
import InfoBadge from '../molecules/InfoBadge';
import SpecialtyBadge from '../molecules/SpecialtyBadge';

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-lg);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    gap: var(--spacing-md);
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
    border-width: 3px;
  }
`;

const InfoCol = styled.div`
  display: grid;
  gap: var(--spacing-sm);
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    gap: var(--spacing-xs);
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    gap: var(--spacing-sm);
  }
`;

const RatingWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    width: 100%;
  }
`;

// Лаконичная обёртка статистики
const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
`;

const StatNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-size: var(--font-base);
  font-weight: ${({ theme }) => theme.font.weight.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    font-size: var(--font-sm);
  }
`;

const StatLabel = styled.span`
  font-size: var(--font-xs);
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
`;

function formatFullName(firstName, lastName, middleName) {
  const parts = [lastName, firstName].filter(Boolean);
  if (middleName) parts.push(middleName);
  return parts.join(' ');
}

function formatExperience(experienceLevel) {
  if (!experienceLevel) return '';
  if (typeof experienceLevel === 'string') return experienceLevel;
  if (experienceLevel.level) return experienceLevel.level;
  if (experienceLevel.name) return experienceLevel.name;
  return String(experienceLevel);
}

const DoctorHeaderSection = memo(({ doctor }) => {
  const { t } = useTranslation();

  const fullName = useMemo(
    () => formatFullName(doctor.first_name, doctor.last_name, doctor.middle_name),
    [doctor.first_name, doctor.last_name, doctor.middle_name]
  );

  return (
    <Section>
      <HeaderGrid>
        <Avatar src={doctor.profile_picture} alt={fullName} />

        <InfoCol>
          <EntityName>{fullName}</EntityName>

          <TagsRow>
            {doctor.specialties?.map((s) => (
              <SpecialtyBadge key={s.id} icon={s.icon} name={s.name} />
            ))}
          </TagsRow>

            <RatingWrap>
                <RatingStars rating={doctor.rating} />
            </RatingWrap>

          <MetaRow>

            {doctor.medical_category && <InfoBadge>{doctor.medical_category.name}</InfoBadge>}
            {doctor.academic_degree && <InfoBadge>{doctor.academic_degree.name}</InfoBadge>}
            {doctor.experience_level && (
              <InfoBadge>{formatExperience(doctor.experience_level)}</InfoBadge>
            )}
          </MetaRow>

          <StatsRow>
            <StatItem>
              <StatNumber>{doctor.workplaces?.length || 0}</StatNumber>
              <StatLabel>{t('doctor.workplaces')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{doctor.appointments_count || 0}</StatNumber>
              <StatLabel>{t('doctor.appointments')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{doctor.reviews_count || 0}</StatNumber>
              <StatLabel>{t('doctor.reviews')}</StatLabel>
            </StatItem>
          </StatsRow>
        </InfoCol>
      </HeaderGrid>
    </Section>
  );
});

export default DoctorHeaderSection;


