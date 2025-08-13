import React, { memo } from 'react';
import styled from 'styled-components';
import ClinicCard from './ClinicCard';
import EmptyState from '../atoms/EmptyState';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/NotFound.svg';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import SkeletonCard from '../atoms/SkeletonCard';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-lg);
`;


const ClinicList = memo(({ clinics, favorites = [], onFavorite, loading = false }) => {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <ListContainer aria-busy="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} avatarSize="md" avatarRound={false} footerButtons={3} />
        ))}
      </ListContainer>
    );
  }

  if (!clinics || clinics.length === 0) {
    return (
      <EmptyState icon={<NotFoundIcon />} title={t('clinics.notFound', 'Клиники не найдены')} />
    );
  }

  return (
    <ListContainer aria-busy="false">
      {clinics.map((clinic) => (
        <ClinicCard 
          key={clinic.id} 
          clinic={clinic} 
          favorite={favorites.includes(clinic.id)}
          onFavorite={onFavorite}
        />
      ))}
    </ListContainer>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.loading === nextProps.loading &&
    prevProps.clinics.length === nextProps.clinics.length &&
    prevProps.favorites.length === nextProps.favorites.length &&
    prevProps.clinics.every((clinic, index) => 
      clinic.id === nextProps.clinics[index]?.id
    ) &&
    prevProps.favorites.every((id, index) => 
      id === nextProps.favorites[index]
    )
  );
});

export default ClinicList; 