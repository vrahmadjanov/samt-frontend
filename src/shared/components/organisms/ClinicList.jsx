import React, { memo } from 'react';
import styled from 'styled-components';
import ClinicCard from './ClinicCard';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import Skeleton from '../atoms/Skeleton';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-lg);
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
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
`;

const ImageSk = styled(Skeleton)`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 64px;
    height: 64px;
  }
`;

const NameSk = styled(Skeleton)`
  width: 55%;
  height: 22px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const BadgeSk = styled(Skeleton)`
  width: 110px;
  height: 20px;
`;

const RatingSk = styled(Skeleton)`
  width: 120px;
  height: 16px;
`;

const AddressSk = styled(Skeleton)`
  width: 65%;
  height: 16px;
`;

const FavSk = styled(Skeleton)`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const MapBtnSk = styled(Skeleton)`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const PrimaryBtnSk = styled(Skeleton)`
  width: 140px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ClinicList = memo(({ clinics, favorites = [], onFavorite, loading = false }) => {
  const { t, language } = useTranslation();
  
  if (loading) {
    return (
      <ListContainer>
        {Array.from({ length: 10 }).map((_, i) => (
          <CardSkeleton key={i}>
            <TopRow>
              <ImageSk />
              <InfoCol>
                <NameSk />
                <BadgeRow>
                  <BadgeSk />
                  <BadgeSk />
                </BadgeRow>
                <RatingSk />
                <AddressSk />
              </InfoCol>
            </TopRow>
            <FooterRow>
              <FavSk />
              <MapBtnSk />
              <PrimaryBtnSk />
            </FooterRow>
          </CardSkeleton>
        ))}
      </ListContainer>
    );
  }

  if (!clinics || clinics.length === 0) {
    return (
      <EmptyMessage>
        {t('clinics.notFound', 'Клиники не найдены')}
      </EmptyMessage>
    );
  }

  return (
    <ListContainer>
      {clinics.map((clinic) => (
        <ClinicCard 
          key={`${clinic.id}-${language}`} 
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