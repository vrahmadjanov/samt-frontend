import React, { memo } from 'react';
import styled from 'styled-components';
import DoctorCard from './DoctorCard';
import EmptyState from '../atoms/EmptyState';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/NotFound.svg';
import SkeletonCard from '../atoms/SkeletonCard';
import { useTranslation } from '../../../shared/i18n/useTranslation';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-lg);
`;

const DoctorList = memo(({ doctors, favorites = [], onFavorite, loading = false }) => {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <ListContainer>
        {Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCard key={i} avatarSize="md" avatarRound footerButtons={2} />
        ))}
      </ListContainer>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <EmptyState icon={<NotFoundIcon />} title={t('doctors.notFound', 'Врачи не найдены')} />
    );
  }

  return (
    <ListContainer>
      {doctors.map(doctor => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          favorite={favorites.includes(doctor.id)}
          onFavorite={onFavorite}
        />
      ))}
    </ListContainer>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.loading === nextProps.loading &&
    prevProps.doctors.length === nextProps.doctors.length &&
    prevProps.favorites.length === nextProps.favorites.length &&
    prevProps.doctors.every((doctor, index) => 
      doctor.id === nextProps.doctors[index]?.id
    ) &&
    prevProps.favorites.every((id, index) => 
      id === nextProps.favorites[index]
    )
  );
});

export default DoctorList;