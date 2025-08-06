import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import { useAppointmentSlots } from '../../../features/appointment/model/useAppointmentSlots';

// Контейнер компонента
const Container = styled.div`
  width: 100%;
`;

// Заголовок секции
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-md);
  }
  
  @media (max-width: 480px) {
    margin-bottom: var(--spacing-sm);
  }
`;

// Навигация по датам
const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  @media (max-width: 480px) {
    gap: var(--spacing-sm);
  }
`;

// Кнопка навигации
const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary + '08'};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 40px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

// Контейнер для датапикера
const DatePickerWrapper = styled.div`
  position: relative;
  min-width: 140px;
  
  @media (max-width: 480px) {
    min-width: 120px;
  }
`;

// Стилизованный датапикер
const DateInput = styled.input`
  width: 100%;
  height: 44px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary + '15'};
  }
  
  @media (max-width: 480px) {
    height: 40px;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-xs);
  }
`;



// Контейнер для слотов
const SlotsContainer = styled.div`
  margin-top: var(--spacing-md);
`;

// Сетка слотов
const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: var(--spacing-xs);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
`;

// Кнопка слота
const SlotButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-xs);
  border: 1px solid ${({ theme, $isAvailable }) => 
    $isAvailable ? theme.colors.border : theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $isAvailable }) => 
    $isAvailable ? theme.colors.white : theme.colors.background};
  color: ${({ theme, $isAvailable }) => 
    $isAvailable ? theme.colors.text : theme.colors.textLight};
  font-size: var(--font-xs);
  font-weight: 600;
  cursor: ${({ $isAvailable }) => $isAvailable ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  min-height: 40px;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary + '08'};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    min-height: 36px;
    font-size: var(--font-xs);
  }
  
  @media (max-width: 480px) {
    min-height: 32px;
    padding: var(--spacing-xs);
  }
`;

// Сообщение об отсутствии слотов
const NoSlotsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  text-align: center;
  margin-top: var(--spacing-md);
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-md) var(--spacing-sm);
  }
`;

// Иконка для сообщения
const NoSlotsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary + '10'};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: var(--spacing-md);
  
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// Заголовок сообщения
const NoSlotsTitle = styled.h4`
  font-size: var(--font-md);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-xs);
  
  @media (max-width: 480px) {
    font-size: var(--font-sm);
  }
`;

// Описание сообщения
const NoSlotsDescription = styled.p`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.5;
  max-width: 400px;
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;

// Сообщения о загрузке и ошибке
const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-sm);
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  color: ${({ theme }) => theme.colors.error};
  font-size: var(--font-sm);
`;

// Форматирование времени
const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString.slice(0, 5);
};



const AppointmentSlots = ({ workplace }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { slots, loading, error } = useAppointmentSlots(workplace.id, selectedDate);

  const handlePreviousDay = useCallback(() => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  }, [selectedDate]);

  const handleNextDay = useCallback(() => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  }, [selectedDate]);

  const handleSlotClick = useCallback((slot) => {
    if (slot.is_available) {
      // TODO: Добавить логику записи на прием
      console.log('Запись на прием:', {
        workplaceId: workplace.id,
        date: selectedDate,
        startTime: slot.start_time,
        endTime: slot.end_time
      });
    }
  }, [workplace.id, selectedDate]);

  const today = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === today;

  // Мемоизируем заголовок секции
  const sectionHeader = useMemo(() => (
    <SectionHeader>
      <DateNavigation>
        <NavButton 
          onClick={handlePreviousDay}
          disabled={isToday}
          title={t('common.previous')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavButton>
        
        <DatePickerWrapper>
          <DateInput
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}

          />
        </DatePickerWrapper>
        
        <NavButton 
          onClick={handleNextDay}
          title={t('common.next')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavButton>
      </DateNavigation>
    </SectionHeader>
  ), [selectedDate, isToday, handlePreviousDay, handleNextDay, today, t]);

  return (
    <Container>
      {sectionHeader}
      
      <SlotsContainer>
        {!loading && !error && (
          <>
            {slots && slots.work_start && slots.work_end && slots.slots && slots.slots.length > 0 ? (
              <SlotsGrid>
                {slots.slots.map((slot, index) => (
                  <SlotButton
                    key={index}
                    $isAvailable={slot.is_available}
                    onClick={() => handleSlotClick(slot)}
                    disabled={!slot.is_available}
                  >
                    {formatTime(slot.start_time)}
                  </SlotButton>
                ))}
              </SlotsGrid>
            ) : (
              <NoSlotsMessage>
                <NoSlotsIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </NoSlotsIcon>
                <NoSlotsTitle>{t('doctor.noSlotsTitle')}</NoSlotsTitle>
                <NoSlotsDescription>{t('doctor.noSlotsDescription')}</NoSlotsDescription>
              </NoSlotsMessage>
            )}
          </>
        )}

        {loading && (
          <LoadingMessage>{t('common.loading')}</LoadingMessage>
        )}

        {error && (
          <ErrorMessage>{t('common.error')}</ErrorMessage>
        )}
      </SlotsContainer>
    </Container>
  );
};

export default AppointmentSlots; 