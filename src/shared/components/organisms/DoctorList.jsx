import React, { memo } from 'react';
import styled from 'styled-components';
import DoctorCard from './DoctorCard';

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

const DoctorList = memo(({ doctors, favorites = [], onFavorite }) => {
  if (!doctors || doctors.length === 0) {
    return (
      <EmptyMessage>
        Врачи не найдены
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