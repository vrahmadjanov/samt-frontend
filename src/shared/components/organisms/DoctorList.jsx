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
  box-sizing: border-box;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: var(--spacing-md);
  }
`;

const TopRow = styled.div`
  display: flex;
  gap: var(--gap-md);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: var(--gap-sm);
  }
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-end;
    gap: var(--gap-sm);
  }
`;

// Адаптивные скелетоны под элементы карточки
const AvatarSkeleton = styled(Skeleton)`
  width: 80px;
  height: 80px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 64px;
    height: 64px;
  }
`;

const NameSkeleton = styled(Skeleton)`
  width: 55%;
  height: 22px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
    height: 20px;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const BadgeSkeleton = styled(Skeleton)`
  width: 90px;
  height: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 18px;
  }
`;

const RatingSkeleton = styled(Skeleton)`
  width: 120px;
  height: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
  }
`;

const WorkplaceSkeleton = styled(Skeleton)`
  width: 65%;
  height: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
  }
`;

const FavSkeleton = styled(Skeleton)`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 38px;
    height: 38px;
  }
`;

const PrimaryBtnSkeleton = styled(Skeleton)`
  width: 160px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 140px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
`;

const DoctorList = memo(({ doctors, favorites = [], onFavorite, loading = false }) => {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <ListContainer>
        {Array.from({ length: 20 }).map((_, i) => (
          <CardSkeleton key={i}>
            <TopRow>
              <AvatarSkeleton circle />
              <InfoCol>
                <NameSkeleton />
                <BadgeRow>
                  <BadgeSkeleton />
                  <BadgeSkeleton />
                  <BadgeSkeleton />
                </BadgeRow>
                <RatingSkeleton />
                <WorkplaceSkeleton />
              </InfoCol>
            </TopRow>
            <FooterRow>
              <FavSkeleton />
              <PrimaryBtnSkeleton />
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