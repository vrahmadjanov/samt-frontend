import React, { memo } from 'react';
import styled from 'styled-components';
import DoctorCard from './DoctorCard';
import Skeleton from '../atoms/Skeleton';
import { useTranslation } from '../../../shared/i18n/useTranslation';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-lg);
`;

const CardSkeleton = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
`;

const TopRow = styled.div`
  display: flex;
  gap: var(--gap-md);
`;

const InfoCol = styled.div`
  flex: 1;
  display: grid;
  gap: 8px;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
`;

const DoctorList = memo(({ doctors, favorites = [], onFavorite, loading = false }) => {
  const { t, language } = useTranslation();
  
  if (loading) {
    return (
      <ListContainer>
        {Array.from({ length: 10 }).map((_, i) => (
          <CardSkeleton key={i}>
            <TopRow>
              <Skeleton width={80} height={80} circle />
              <InfoCol>
                {/* Имя врача */}
                <Skeleton width={'55%'} height={22} />
                {/* Бейджи специализаций */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <Skeleton width={90} height={20} />
                  <Skeleton width={90} height={20} />
                  <Skeleton width={90} height={20} />
                </div>
                {/* Рейтинг */}
                <Skeleton width={120} height={16} />
                {/* Workplace строка */}
                <Skeleton width={'65%'} height={16} />
              </InfoCol>
            </TopRow>
            <FooterRow>
              {/* Favorite button placeholder */}
              <Skeleton width={42} height={42} />
              {/* Primary action button placeholder */}
              <Skeleton width={160} height={42} />
            </FooterRow>
          </CardSkeleton>
        ))}
      </ListContainer>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <EmptyMessage>
        {t('doctors.notFound', 'Врачи не найдены')}
      </EmptyMessage>
    );
  }

  return (
    <ListContainer>
      {doctors.map(doctor => (
        <DoctorCard
          key={`${doctor.id}-${language}`}
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