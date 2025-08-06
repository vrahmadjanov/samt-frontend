import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import ClinicInfo from '../molecules/ClinicInfo';
import AppointmentSlots from '../molecules/AppointmentSlots';
import InfoBadge from '../molecules/InfoBadge';
import Badges from '../atoms/Badges';

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

const DoctorWorkplacesSection = ({ doctor, selectedWorkplace }) => {
  const { t } = useTranslation();

  if (!doctor.workplaces || doctor.workplaces.length === 0 || !selectedWorkplace) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>{t('doctor.quickAppointment')}</SectionTitle>
      
      <ClinicInfo clinic={selectedWorkplace.clinic} />
      
      <Badges style={{ marginBottom: 'var(--spacing-md)' }}>
        <InfoBadge>{t('doctor.office')}: {selectedWorkplace.office_number}</InfoBadge>
        <InfoBadge>{t('doctor.appointmentInterval')}: {selectedWorkplace.appointment_interval} {t('common.minutes')}</InfoBadge>
      </Badges>
      
      <AppointmentSlots workplace={selectedWorkplace} />
    </Section>
  );
};

export default DoctorWorkplacesSection; 