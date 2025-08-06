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

const TitlesContent = styled.div`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  white-space: pre-line;
`;

const DoctorTitlesSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.titles_and_merits) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>{t('doctor.titlesAndMerits')}</SectionTitle>
      <TitlesContent>
        {doctor.titles_and_merits}
      </TitlesContent>
    </Section>
  );
};

export default DoctorTitlesSection; 