import React, { memo } from 'react';
import Section from '../molecules/Section';
import DoctorList from './DoctorList';
import { useTranslation } from '../../i18n/useTranslation';

const ClinicDoctorsSkeleton = memo(() => {
  const { t } = useTranslation();
  return (
    <Section title={t('clinics.doctorsSectionTitle') || 'Врачи клиники'}>
      <DoctorList loading={true} doctors={[]} favorites={[]} onFavorite={() => {}} />
    </Section>
  );
});

export default ClinicDoctorsSkeleton;


