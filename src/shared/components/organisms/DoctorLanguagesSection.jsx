import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';

const LanguagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
`;

const LanguageItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const LanguageLabel = styled.span`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

const LanguageValue = styled.span`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const DoctorLanguagesSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.languages || doctor.languages.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.languages')}>
      <LanguagesGrid>
        {doctor.languages.map(lang => (
          <LanguageItem key={lang.id}>
            <LanguageLabel>{lang.language.name}</LanguageLabel>
            <LanguageValue>{lang.level.level}</LanguageValue>
          </LanguageItem>
        ))}
      </LanguagesGrid>
    </Section>
  );
};

export default DoctorLanguagesSection; 