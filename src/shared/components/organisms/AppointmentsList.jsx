import React, { memo } from 'react';
import styled from 'styled-components';
import AppointmentCard from './AppointmentCard';
import { useTranslation } from '../../../shared/i18n/useTranslation';

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

const AppointmentsList = memo(({ appointments, onCancel, onConfirm }) => {
  const { t, language } = useTranslation();
  
  if (!appointments || appointments.length === 0) {
    return (
      <EmptyMessage>
        {t('appointments.notFound')}
      </EmptyMessage>
    );
  }

  return (
    <ListContainer>
      {appointments.map(appointment => (
        <AppointmentCard
          key={`${appointment.id}-${language}`}
          appointment={appointment}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      ))}
    </ListContainer>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.appointments.length === nextProps.appointments.length &&
    prevProps.appointments.every((appointment, index) => 
      appointment.id === nextProps.appointments[index]?.id
    )
  );
});

export default AppointmentsList; 