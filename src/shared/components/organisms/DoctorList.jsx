import React from 'react';
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

const DoctorList = ({ doctors, favorites = [], onFavorite }) => {
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
};

export default DoctorList; 