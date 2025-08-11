import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';

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
    <Section title={t('doctor.about')}>
      <AboutText>{doctor.about}</AboutText>
    </Section>
  );
};

export default DoctorAboutSection; 