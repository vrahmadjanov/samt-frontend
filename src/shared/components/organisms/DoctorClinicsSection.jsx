import React, { memo, useMemo } from 'react';
import Section from '../molecules/Section';
import ClinicList from './ClinicList';
import { useTranslation } from '../../i18n/useTranslation';
import { useFavoriteClinics } from '../../../features/clinic/model/useFavoriteClinics';
import { addClinicToFavorites, removeClinicFromFavorites } from '../../../entities/clinic/favoritesApi';

// Собираем список уникальных клиник из рабочих мест врача
const useUniqueClinics = (workplaces) => {
  return useMemo(() => {
    const map = new Map();
    (workplaces || []).forEach((wp) => {
      if (wp?.clinic && !map.has(wp.clinic.id)) {
        map.set(wp.clinic.id, wp.clinic);
      }
    });
    return Array.from(map.values());
  }, [workplaces]);
};

const DoctorClinicsSection = memo(({ doctor }) => {
  const { t } = useTranslation();
  const { favoriteIds, addToFavorites, removeFromFavorites } = useFavoriteClinics();
  const clinics = useUniqueClinics(doctor?.workplaces);

  if (!clinics || clinics.length === 0) return null;

  return (
    <Section frameless title={t('doctor.clinicsSectionTitle') || 'Медицинские учреждения врача'}>
      <ClinicList 
        clinics={clinics} 
        favorites={favoriteIds}
        onFavorite={async (clinicId, isAdding) => {
          try {
            if (isAdding) {
              await addClinicToFavorites(clinicId);
              addToFavorites(clinicId);
            } else {
              await removeClinicFromFavorites(clinicId);
              removeFromFavorites(clinicId);
            }
          } catch (e) {
            console.error('Clinic favorite toggle failed', e);
          }
        }}
      />
    </Section>
  );
});

export default DoctorClinicsSection;


