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

const AboutText = styled.p`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin: 0;
`;

const DoctorAboutSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.about) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>{t('doctor.about')}</SectionTitle>
      <AboutText>{doctor.about}</AboutText>
    </Section>
  );
};

export default DoctorAboutSection; 