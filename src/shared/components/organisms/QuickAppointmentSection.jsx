import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import { useAppointmentSlots } from '../../../features/appointment/model/useAppointmentSlots';    
import Button from '../atoms/Button';
import Section from '../molecules/Section';
import ClinicInfo from '../molecules/ClinicInfo';
import Badges from '../atoms/Badges';
import InfoBadge from '../molecules/InfoBadge';
import Skeleton from '../atoms/Skeleton';
import ErrorMessage from '../atoms/ErrorMessage';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/NotFound.svg';
import EmptyState from '../atoms/EmptyState';
import WorkplaceSwitcher from '../molecules/WorkplaceSwitcher';

// Вложенная карточка: шапка (инфо о месте работы) + тело (слоты)
const WorkplaceCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
`;

const WorkplaceCardHeader = styled.div`
  padding: var(--spacing-md);
  border-radius: ${({ theme }) => theme.radius.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const WorkplaceCardBody = styled.div`
`;

// Контейнер для слотов
const SlotsContainer = styled.div`
  padding: var(--spacing-md);
  border-radius: ${({ theme }) => theme.radius.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

// Навигация по датам
const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xs) 0;
`;

// Кнопка навигации
const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $isDisabled }) => 
    $isDisabled ? theme.colors.background : theme.colors.white};
  color: ${({ theme, $isDisabled }) => 
    $isDisabled ? theme.colors.textLight : theme.colors.text};
  cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.4;
  }
  
  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
`;

// Контейнер для датапикера
const DatePickerWrapper = styled.div``;

// Стилизованный датапикер
const DateInput = styled.input`
  width: 100%;
  height: 44px;
  padding: var(--spacing-sm) var(--spacing-xs);
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-base);
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary + '15'};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 40px;
    font-size: var(--font-sm);
    padding: var(--spacing-xs) 0;
  }
`;

// Контейнер для сетки слотов
const SlotsGridContainer = styled.div`
`;

// Сетка слотов
const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: var(--spacing-sm);
  justify-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--spacing-xs);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  }
`;

// Кнопка слота
const SlotButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 var(--spacing-md);
  border: 1px solid ${({ theme, $isAvailable, $isSelected }) => {
    if ($isSelected) return theme.colors.primary;
    return $isAvailable ? theme.colors.border : theme.colors.borderLight;
  }};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $isAvailable, $isSelected }) => {
    if ($isSelected) return theme.colors.primary;
    return $isAvailable ? theme.colors.white : theme.colors.background;
  }};
  color: ${({ theme, $isAvailable, $isSelected }) => {
    if ($isSelected) return theme.colors.white;
    return $isAvailable ? theme.colors.text : theme.colors.textLight;
  }};
  font-size: var(--font-base);
  font-weight: 500;
  cursor: ${({ $isAvailable }) => $isAvailable ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  width: 100%;
  max-width: 150px;
  min-width: 104px;
  
  &:hover:not(:disabled) {
    background: ${({ theme, $isSelected }) => 
      $isSelected ? theme.colors.primary : theme.colors.primary + '08'};
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
    height: 44px;
    font-size: var(--font-base);
    max-width: 140px;
    min-width: 100px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 40px;
    padding: 0 var(--spacing-sm);
    max-width: 136px;
    min-width: 92px;
  }
`;

// Форматирование времени
const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString.slice(0, 5);
};

const QuickAppointmentSection = ({ doctor, selectedWorkplace, onWorkplaceSelect }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const { slots, loading, error } = useAppointmentSlots(
    selectedWorkplace?.id, 
    selectedDate
  );

  const handlePreviousDay = useCallback(() => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
    setSelectedSlot(null); // Сбрасываем выбранный слот при смене даты
  }, [selectedDate]);

  const handleNextDay = useCallback(() => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
    setSelectedSlot(null); // Сбрасываем выбранный слот при смене даты
  }, [selectedDate]);

  const handleSlotClick = useCallback((slot) => {
    if (slot.is_available) {
      setSelectedSlot(slot);
    }
  }, [setSelectedSlot]);

  const handleBookAppointment = useCallback(() => {
    if (selectedSlot && selectedWorkplace) {
      // TODO: Добавить логику записи на прием
      console.log('Запись на прием:', {
        workplaceId: selectedWorkplace.id,
        date: selectedDate,
        startTime: selectedSlot.start_time,
        endTime: selectedSlot.end_time
      });
    }
  }, [selectedSlot, selectedWorkplace, selectedDate]);

  const today = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === today;

  // Мемоизируем навигацию по датам
  const dateNavigation = useMemo(() => (
    <DateNavigation>
      <NavButton 
        onClick={handlePreviousDay}
        disabled={isToday}
        $isDisabled={isToday}
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
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot(null); // Сбрасываем выбранный слот при смене даты
          }}
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
  ), [selectedDate, isToday, handlePreviousDay, handleNextDay, today, t]);

  if (!doctor.workplaces || doctor.workplaces.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.quickAppointment')}>
      {doctor.workplaces && doctor.workplaces.length > 1 && (
        <WorkplaceSwitcher
          workplaces={doctor.workplaces}
          selectedId={selectedWorkplace?.id}
          onSelect={onWorkplaceSelect}
        />
      )}

      {selectedWorkplace && (
          <WorkplaceCard>
          <WorkplaceCardHeader>
            <ClinicInfo clinic={selectedWorkplace.clinic} />
            <Badges>
              <InfoBadge>{t('doctor.office')}: {selectedWorkplace.office_number}</InfoBadge>
              <InfoBadge>
                {t('doctor.appointmentInterval')}: {selectedWorkplace.appointment_interval} {t('common.minutes')}
              </InfoBadge>
            </Badges>
          </WorkplaceCardHeader>

          <WorkplaceCardBody>
            {dateNavigation}

            <SlotsContainer>
              {!loading && !error && (
                <>
                  {slots && slots.work_start && slots.work_end && slots.slots && slots.slots.length > 0 ? (
                    <SlotsGridContainer>
                      <SlotsGrid>
                        {slots.slots.map((slot, index) => {
                          const isSelected = selectedSlot &&
                            selectedSlot.start_time === slot.start_time &&
                            selectedSlot.end_time === slot.end_time;
                          return (
                            <SlotButton
                              key={index}
                              $isAvailable={slot.is_available}
                              $isSelected={isSelected}
                              onClick={() => handleSlotClick(slot)}
                              disabled={!slot.is_available}
                            >
                              {formatTime(slot.start_time)}
                            </SlotButton>
                          );
                        })}
                      </SlotsGrid>
                    </SlotsGridContainer>
                  ) : (
                    <EmptyState
                      icon={<NotFoundIcon />}
                      title={t('doctor.noSlotsTitle') || t('doctor.noSlotsDescription')}
                      subtitle={t('doctor.noSlotsDescription')}
                    />
                  )}
                </>
              )}

              {loading && (
                <SlotsGrid>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} height={44} />
                  ))}
                </SlotsGrid>
              )}

              {error && (
                <ErrorMessage>{t('common.error')}</ErrorMessage>
              )}
            </SlotsContainer>
          </WorkplaceCardBody>
          </WorkplaceCard>
      )}

      {/* Кнопка записи */}
      {selectedWorkplace && (
        <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleBookAppointment} disabled={!selectedSlot}>
            {t('common.book')}
          </Button>
        </div>
      )}
    </Section>
  );
};

export default QuickAppointmentSection; 