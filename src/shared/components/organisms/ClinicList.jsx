import React, { memo } from 'react';
import styled from 'styled-components';
import ClinicCard from './ClinicCard';

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

const ClinicList = memo(({ clinics, favorites = [], onFavorite }) => {
  if (!clinics || clinics.length === 0) {
    return (
      <EmptyMessage>
        Клиники не найдены
      </EmptyMessage>
    );
  }

  return (
    <ListContainer>
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