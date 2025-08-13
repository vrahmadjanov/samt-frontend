import React, { memo } from 'react';
import styled from 'styled-components';
import DoctorList from './DoctorList';
import { useClinicDoctors } from '../../../features/clinic/model/useClinicDoctors';
import { useTranslation } from '../../i18n/useTranslation';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/NotFound.svg';
import { useFavoriteDoctors } from '../../../features/doctor/model/useFavoriteDoctors';

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  gap: var(--spacing-sm);
`;

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
        <EmptyWrap>
          <NotFoundIcon style={{ width: 40, height: 40 }} />
          <div>{t('clinics.doctorsNotFound') || 'Врачи данной клиники не найдены'}</div>
        </EmptyWrap>
      )}
    </BlockWrap>
  );
});

export default ClinicDoctorsSection;


