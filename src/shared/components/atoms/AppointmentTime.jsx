import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';

const TimeContainer = styled.div`
  display: inline-flex;
  padding: 0 var(--spacing-sm);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  gap: var(--spacing-sm);
  max-width: fit-content;
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
`;

const DateValue = styled.div`
  font-size: var(--font-md);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: ${({ theme }) => theme.colors.border};
`;

const TimeSection = styled.div`
  display: flex;
  align-items: center;
`;

const TimeValue = styled.div`
  font-size: var(--font-md);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const AppointmentTime = ({ 
  selectedDate, 
  selectedSlot, 
  className 
}) => {
  const { t, language } = useTranslation();

  const formatDate = () => {
    if (!selectedDate) return '';
    
    const [, m, d] = selectedDate.split('-').map(Number);
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    
    const monthName = t(`months.${monthKeys[(m - 1) % 12]}`);
    return language === 'ru' ? `${d} ${monthName}` : `${d} ${monthName}`;
  };

  const formatTime = () => {
    if (!selectedSlot?.start_time) return '';
    return selectedSlot.start_time.slice(0, 5);
  };

  if (!selectedDate || !selectedSlot) {
    return (
      <TimeContainer className={className}>
        <DateSection>
          <DateValue style={{ color: '#9CA3AF' }}>
            {t('doctor.selectDate') || 'Выберите дату'}
          </DateValue>
        </DateSection>
        <Divider />
        <TimeSection>
          <TimeValue style={{ color: '#9CA3AF' }}>--:--</TimeValue>
        </TimeSection>
      </TimeContainer>
    );
  }

  return (
    <TimeContainer className={className}>
      <DateSection>
        <DateValue>{formatDate()}</DateValue>
      </DateSection>
      <Divider />
      <TimeSection>
        <TimeValue>{formatTime()}</TimeValue>
      </TimeSection>
    </TimeContainer>
  );
};

export default AppointmentTime;
