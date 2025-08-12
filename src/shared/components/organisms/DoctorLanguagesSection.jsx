import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';
import ProgressBar from '../atoms/ProgressBar';

const LanguagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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

const LevelRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const LevelText = styled.span`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
`;

const LanguageProgress = styled(ProgressBar)`
  flex: 1;
`;

// Маппинг ID уровня на проценты
const mapLevelToProgress = (levelId) => {
  switch (levelId) {
    case 1: // Родной язык
      return { value: 100 };
    case 2: // Свободное владение
      return { value: 85 };
    case 3: // Рабочий уровень
      return { value: 65 };
    case 4: // Элементарное владение
      return { value: 40 };
    default:
      return { value: 0 };
  }
};

const DoctorLanguagesSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.languages || doctor.languages.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.languages')}>
      <LanguagesGrid>
        {doctor.languages.map((lang) => {
          const { value } = mapLevelToProgress(lang.level?.id);
          return (
            <LanguageItem key={lang.id}>
              <LanguageLabel>{lang.language?.name}</LanguageLabel>
              <LevelRow>
                <LanguageProgress value={value} />
                <LevelText>{lang.level?.level}</LevelText>
              </LevelRow>
            </LanguageItem>
          );
        })}
      </LanguagesGrid>
    </Section>
  );
};

export default DoctorLanguagesSection; 