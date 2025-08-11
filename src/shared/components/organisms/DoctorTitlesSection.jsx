import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';

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
    <Section title={t('doctor.titlesAndMerits')}>
      <TitlesContent>
        {doctor.titles_and_merits}
      </TitlesContent>
    </Section>
  );
};

export default DoctorTitlesSection; 