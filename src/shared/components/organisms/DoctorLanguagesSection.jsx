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
    <Section>
      <SectionTitle>{t('doctor.languages')}</SectionTitle>
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