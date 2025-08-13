import React, { memo } from 'react';
import Section from '../molecules/Section';
import DoctorList from './DoctorList';
import { useClinicDoctors } from '../../../features/clinic/model/useClinicDoctors';
import { useTranslation } from '../../i18n/useTranslation';
import EmptyClinicDoctors from '../molecules/EmptyClinicDoctors';
import { useFavoriteDoctors } from '../../../features/doctor/model/useFavoriteDoctors';


const ClinicDoctorsSection = memo(({ clinicId }) => {
  const { t } = useTranslation();
  const { doctors, loading } = useClinicDoctors(clinicId);
  const { favoriteIds, addToFavorites, removeFromFavorites } = useFavoriteDoctors();

  return (
    <Section frameless title={t('clinics.doctorsSectionTitle') || 'Врачи клиники'}>
      {loading ? (
        <DoctorList doctors={[]} favorites={favoriteIds} onFavorite={() => {}} loading={true} />
      ) : doctors && doctors.length > 0 ? (
        <DoctorList
          doctors={doctors}
          favorites={favoriteIds}
          onFavorite={(doctorId, isAdding) => {
            if (isAdding) addToFavorites(doctorId);
            else removeFromFavorites(doctorId);
          }}
        />
      ) : (
        <EmptyClinicDoctors />
      )}
    </Section>
  );
});

export default ClinicDoctorsSection;


