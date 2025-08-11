import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import ClinicInfo from '../molecules/ClinicInfo';
import AppointmentSlots from '../molecules/AppointmentSlots';
import InfoBadge from '../molecules/InfoBadge';
import Badges from '../atoms/Badges';
import Section from '../molecules/Section';

const DoctorWorkplacesSection = ({ doctor, selectedWorkplace }) => {
  const { t } = useTranslation();

  if (!doctor.workplaces || doctor.workplaces.length === 0 || !selectedWorkplace) {
    return null;
  }

  return (
    <Section title={t('doctor.quickAppointment')}>
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