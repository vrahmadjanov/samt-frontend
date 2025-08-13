import React, { memo } from 'react';
import styled from 'styled-components';
import DoctorList from './DoctorList';
import { useClinicDoctors } from '../../../features/clinic/model/useClinicDoctors';
import { useTranslation } from '../../i18n/useTranslation';
import EmptyClinicDoctors from '../molecules/EmptyClinicDoctors';
import { useFavoriteDoctors } from '../../../features/doctor/model/useFavoriteDoctors';


const BlockWrap = styled.div`
  width: 100%;
  margin: var(--spacing-lg) 0;
`;

const BlockHeader = styled.header`
  width: 100%;
  max-width: 700px;
  margin: 0 auto var(--spacing-md);
`;

const BlockTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ClinicDoctorsSection = memo(({ clinicId }) => {
  const { t } = useTranslation();
  const { doctors, loading } = useClinicDoctors(clinicId);
  const { favoriteIds, addToFavorites, removeFromFavorites } = useFavoriteDoctors();

  return (
    <BlockWrap>
      <BlockHeader>
        <BlockTitle>{t('clinics.doctorsSectionTitle') || 'Врачи клиники'}</BlockTitle>
      </BlockHeader>
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
    </BlockWrap>
  );
});

export default ClinicDoctorsSection;


