import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { Card, CardTopRow, CardInfo, CardFooter } from '../atoms/Card';
import Button from '../atoms/Button';
import DoctorAvatar from '../atoms/DoctorAvatar';
import InfoBadge from '../molecules/InfoBadge';

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const DoctorDetails = styled.div`
  flex: 1;
`;

const DoctorName = styled.div`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-xs);
`;

const DoctorSpecialties = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-sm);
`;

const AppointmentDetails = styled.div`
  margin-top: var(--spacing-md);
`;

const AppointmentTime = styled.div`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
`;

const AppointmentDate = styled.div`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: var(--spacing-sm);
`;

const ClinicInfo = styled.div`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: var(--spacing-sm);
`;

const StatusBadge = styled(InfoBadge)`
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'upcoming':
        return theme.colors.primary;
      case 'completed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      case 'noShow':
        return theme.colors.warning || '#ff9800';
      case 'confirmed':
        return theme.colors.info || '#2196f3';
      default:
        return theme.colors.gray[300];
    }
  }};
  color: white;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return {
    date: date.toLocaleDateString('ru-RU'),
    time: date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };
};

const getStatusKey = (statusId) => {
  // Используем ID статуса для универсального решения
  const statusMap = {
    1: 'upcoming',    // Предстоящий
    2: 'completed',   // Завершен
    3: 'cancelled',   // Отменен
    4: 'noShow',      // Пациент не явился
    5: 'confirmed'    // Подтвержден
  };
  return statusMap[statusId] || 'unknown';
};

const AppointmentCard = memo(({ appointment, onCancel, onConfirm, onLeaveReview }) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    if (window.confirm(t('appointments.confirmCancel'))) {
      onCancel(appointment.id);
    }
  };

  const handleConfirm = () => {
    onConfirm(appointment.id, false);
  };

  const handleLeaveReview = () => {
    // TODO: реализовать функциональность оставления отзыва
    alert('Функция оставления отзыва будет реализована позже');
  };

  const { date, time } = formatDateTime(appointment.appointment_time_start);
  const statusKey = getStatusKey(appointment.status.id);

  return (
    <Card>
      <CardTopRow>
        <DoctorInfo>
          <DoctorAvatar 
            src={appointment.doctor.profile_picture} 
            alt={`${appointment.doctor.first_name} ${appointment.doctor.last_name}`}
          />
          <DoctorDetails>
            <DoctorName>
              {appointment.doctor.last_name} {appointment.doctor.first_name} {appointment.doctor.middle_name}
            </DoctorName>
            <DoctorSpecialties>
              {appointment.doctor.specialties.map(specialty => (
                <InfoBadge key={specialty.id}>{specialty.name}</InfoBadge>
              ))}
            </DoctorSpecialties>
          </DoctorDetails>
        </DoctorInfo>
      </CardTopRow>
      
      <CardInfo>
        <AppointmentDetails>
          <AppointmentTime>
            {time} - {formatDateTime(appointment.appointment_time_end).time}
          </AppointmentTime>
          <AppointmentDate>{date}</AppointmentDate>
          <ClinicInfo>
            {appointment.clinic.name} - {appointment.clinic.address}
          </ClinicInfo>
          <StatusBadge status={statusKey}>
            {appointment.status.name}
          </StatusBadge>
        </AppointmentDetails>
      </CardInfo>
      
      <CardFooter>
        <ActionButtons>
          {statusKey === 'upcoming' && (
            <>
              {!appointment.is_confirmed_by_patient && (
                <Button onClick={handleConfirm}>
                  {t('appointments.confirm')}
                </Button>
              )}
              <Button onClick={handleCancel}>
                {t('appointments.cancel')}
              </Button>
            </>
          )}
          {statusKey === 'completed' && (
            <Button onClick={handleLeaveReview}>
              {t('appointments.leaveReview')}
            </Button>
          )}
        </ActionButtons>
      </CardFooter>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.appointment.id === nextProps.appointment.id &&
    prevProps.appointment.status.name === nextProps.appointment.status.name &&
    prevProps.appointment.is_confirmed_by_patient === nextProps.appointment.is_confirmed_by_patient
  );
});

export default AppointmentCard; 