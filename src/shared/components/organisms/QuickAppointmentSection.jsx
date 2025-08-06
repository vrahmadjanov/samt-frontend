import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import { useAppointmentSlots } from '../../../features/appointment/model/useAppointmentSlots';
import ClinicIconComponent from '../atoms/ClinicIcon';
import Button from '../atoms/Button';

// Основной контейнер секции
const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

// Заголовок секции
const SectionTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-md);
`;

// Объединенный контейнер для места работы и слотов
const WorkplaceContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  overflow: hidden;
`;

// Шапка места работы
const WorkplaceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 768px) {
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }
  
  @media (max-width: 480px) {
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }
`;

// Контейнер иконки клиники
const ClinicIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
  
  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
  }
`;

// Контейнер информации о клинике
const ClinicInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

// Название клиники
const ClinicName = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: var(--font-base);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-sm);
  }
`;

// Адрес клиники
const ClinicAddress = styled.p`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;

// Контейнер для дополнительной информации
const ClinicDetailsContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
`;

// Детальная информация
const ClinicDetail = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;

// Иконка детали
const DetailIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.primary};
  
  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2;
  }
`;



// Контейнер для слотов
const SlotsContainer = styled.div`
  padding: var(--spacing-lg);
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-lg);
  }
`;



// Навигация по датам
const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    gap: var(--spacing-sm);
  }
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
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 400px) {
    display: none;
  }
`;

// Контейнер для датапикера
const DatePickerWrapper = styled.div`
  position: relative;
  min-width: 160px;
  
  @media (max-width: 480px) {
    min-width: 140px;
  }
`;

// Стилизованный датапикер
const DateInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-base);
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 480px) {
    height: 40px;
    font-size: var(--font-sm);
  }
`;

// Контейнер для сетки слотов
const SlotsGridContainer = styled.div`
  margin-top: var(--spacing-lg);
`;

// Сетка слотов
const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: var(--spacing-xs);
  }
`;

// Кнопка слота
const SlotButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-xs);
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
  font-size: var(--font-xs);
  font-weight: 600;
  cursor: ${({ $isAvailable }) => $isAvailable ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  min-height: 40px;
  
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
    min-height: 36px;
    font-size: var(--font-xs);
  }
`;



// Сообщение об отсутствии слотов
const NoSlotsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) var(--spacing-md);
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  text-align: center;
  margin-top: var(--spacing-md);
  
  @media (max-width: 768px) {
    padding: var(--spacing-md) var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-sm);
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
  font-size: var(--font-base);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-xs);
  
  @media (max-width: 768px) {
    font-size: var(--font-sm);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;

// Описание сообщения
const NoSlotsDescription = styled.p`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.4;
  max-width: 300px;
  
  @media (max-width: 768px) {
    font-size: var(--font-sm);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;





// Сообщения о загрузке и ошибке
const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
  
  @media (max-width: 480px) {
    padding: var(--spacing-lg);
    font-size: var(--font-sm);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.error};
  font-size: var(--font-base);
  
  @media (max-width: 480px) {
    padding: var(--spacing-lg);
    font-size: var(--font-sm);
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
      // TODO: Добавить логику записи на прием
      console.log('Запись на прием:', {
        workplaceId: selectedWorkplace.id,
        date: selectedDate,
        startTime: slot.start_time,
        endTime: slot.end_time
      });
    }
  }, [selectedWorkplace?.id, selectedDate]);

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
    <Section>
      <SectionTitle>{t('doctor.quickAppointment')}</SectionTitle>
      
      {/* Объединенный контейнер места работы и слотов */}
      {selectedWorkplace && (
        <WorkplaceContainer>
          <WorkplaceHeader>
            <ClinicIconContainer>
              <ClinicIconComponent />
            </ClinicIconContainer>
            
            <ClinicInfoContainer>
              <ClinicName>{selectedWorkplace.clinic.name}</ClinicName>
              <ClinicAddress>{selectedWorkplace.clinic.address}</ClinicAddress>
              
              <ClinicDetailsContainer>
                <ClinicDetail>
                  <DetailIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </DetailIcon>
                  {t('doctor.office')}: {selectedWorkplace.office_number}
                </ClinicDetail>
                
                <ClinicDetail>
                  <DetailIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </DetailIcon>
                  {t('doctor.appointmentInterval')}: {selectedWorkplace.appointment_interval} {t('common.minutes')}
                </ClinicDetail>
              </ClinicDetailsContainer>
            </ClinicInfoContainer>
          </WorkplaceHeader>
          
                    <SlotsContainer>
            {dateNavigation}
            
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
        </WorkplaceContainer>
      )}

      {/* Кнопка записи */}
      {selectedWorkplace && (
        <div style={{ 
          marginTop: 'var(--spacing-lg)', 
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}>
          <Button
            onClick={handleBookAppointment}
            disabled={!selectedSlot}
          >
            {t('common.book')}
          </Button>
        </div>
      )}
    </Section>
  );
};

export default QuickAppointmentSection; 