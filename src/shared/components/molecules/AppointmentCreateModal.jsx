import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Button from '../atoms/Button';
import ToggleSwitch from '../atoms/ToggleSwitch';
import AppointmentTime from '../atoms/AppointmentTime';
import { useTranslation } from '../../i18n/useTranslation';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalForm = styled.form`
  width: 100%;
  max-width: 560px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: var(--spacing-lg);
  display: grid;
  gap: var(--spacing-md);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
`;

const TextArea = Textarea;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: var(--font-sm);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AppointmentCreateModal = ({
  isOpen,
  onClose,
  onConfirm,
  workplaceId,
  selectedDate,
  selectedSlot,
  fieldErrors = {},
  loading = false,
}) => {
  const { t } = useTranslation();
  const [problem, setProblem] = useState('');
  const [isAnother, setIsAnother] = useState(false);
  const [anotherName, setAnotherName] = useState('');
  const [anotherAge, setAnotherAge] = useState('');
  const [anotherGender, setAnotherGender] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);

  const title = t('appointments.createTitle') || 'Запись на прием';

  const resetForm = () => {
    setProblem('');
    setIsAnother(false);
    setAnotherName('');
    setAnotherAge('');
    setAnotherGender('');
    setPhone('');
    setStep(1);
  };

  const validatePhone = (phoneNumber) => {
    // Проверяем формат: +992 и 9 цифр после
    const phoneRegex = /^\+992\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Если поле пустое или пользователь начинает вводить, добавляем +992
    if (value === '') {
      setPhone('');
      return;
    }
    
    // Если пользователь начинает ввод, но не с +992, добавляем префикс
    if (!value.startsWith('+992')) {
      // Если пользователь ввел только цифры, добавляем +992
      if (/^\d/.test(value)) {
        value = '+992' + value;
      } else {
        value = '+992';
      }
    }
    
    // Ограничиваем длину: +992 + 9 цифр = 13 символов
    if (value.length <= 13) {
      setPhone(value);
    }
  };

  const isFormValid = () => {
    if (isAnother) {
      if (step === 1) {
        // На первом шаге обязательно только имя пациента
        return anotherName.trim() !== '';
      } else if (step === 2) {
        // На втором шаге обязательны имя пациента и корректный телефон
        return anotherName.trim() !== '' && validatePhone(phone);
      }
    }
    return true; // Для записи себя нет обязательных полей
  };

  if (!isOpen) return null;

  return (
    <Overlay role="dialog" aria-modal="true">
      <ModalForm onSubmit={(e) => {
        e.preventDefault();
        if (isAnother && step === 1) {
          setStep(2);
          return;
        }
        onConfirm({
          workplace: workplaceId,
          appointment_time_start: `${selectedDate}T${selectedSlot?.start_time}+05:00`,
          problem_description: problem,
          is_another_patient: isAnother,
          another_patient_name: isAnother ? (anotherName || undefined) : undefined,
          another_patient_age: isAnother && anotherAge ? Number(anotherAge) : undefined,
          another_patient_gender: isAnother && anotherGender ? Number(anotherGender) : undefined,
          phone_number: phone || undefined,
        });
      }}>
        <ModalTitle>{title}</ModalTitle>

        <FieldWrapper>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-base)', fontWeight: '500' }}>
            {t('doctor.appointmentTime') || 'Время приема'}
          </label>
          <AppointmentTime 
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
        </FieldWrapper>
        
        <FieldWrapper>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-base)', fontWeight: '500' }}>
            {t('appointments.bookingType') || 'Тип записи'}
          </label>
          <ToggleSwitch
            options={[
              { label: t('doctor.bookForMyself') || 'Для меня' },
              { label: t('doctor.bookForAnother') || 'Для другого' }
            ]}
            activeIndex={isAnother ? 1 : 0}
            onChange={(index) => {
              setIsAnother(index === 1);
              setStep(1); // Сбрасываем на первый шаг при переключении
            }}
          />
        </FieldWrapper>

        {/* Шаг 1 для записи друга: только данные пациента */}
        {isAnother && step === 1 && (
          <>
            <Row>
              <Input 
                label={`${t('doctor.anotherPatientName') || 'Имя пациента'} *`} 
                value={anotherName} 
                onChange={(e) => setAnotherName(e.target.value)}
                required
              />
              <Input label={t('doctor.anotherPatientAge') || 'Возраст'} type="number" value={anotherAge} onChange={(e) => setAnotherAge(e.target.value)} />
            </Row>
            <FieldWrapper>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-base)', fontWeight: '500' }}>
                {t('doctor.anotherPatientGender') || 'Пол пациента'}
              </label>
              <ToggleSwitch
                options={[
                  { label: t('doctor.male') || 'Мужской' },
                  { label: t('doctor.female') || 'Женский' }
                ]}
                activeIndex={anotherGender === '2' ? 1 : 0}
                onChange={(index) => {
                  setAnotherGender(index === 0 ? '1' : '2');
                }}
              />
            </FieldWrapper>
          </>
        )}

        {/* Основные поля для "Для меня" или шаг 2 для "Для друга" */}
        {(!isAnother || (isAnother && step === 2)) && (
          <>
            <FieldWrapper>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-base)', fontWeight: '500' }}>
                {t('doctor.problem') || 'Опишите проблему'}
              </label>
              <TextArea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Например: головная боль, температура, боль в спине"
              />
              {fieldErrors.problem_description && <ErrorText>{fieldErrors.problem_description}</ErrorText>}
            </FieldWrapper>

            {isAnother && (
              <FieldWrapper>
                <Input 
                  label={`${t('doctor.phone') || 'Телефон для связи'} *`} 
                  type="tel"
                  placeholder="+992 9XX XXX XXX"
                  value={phone} 
                  onChange={handlePhoneChange}
                  required
                />
              </FieldWrapper>
            )}
          </>
        )}

        <Actions>
          <Button 
            type="button" 
            onClick={() => { 
              if (isAnother && step === 2) {
                setStep(1); // Возвращаемся на первый шаг
              } else {
                resetForm(); 
                onClose(); // Закрываем модалку и сбрасываем форму
              }
            }} 
            disabled={loading}
          >
            {isAnother && step === 2 ? t('common.back') : t('common.cancel')}
          </Button>
          <Button type="submit" disabled={loading || (isAnother && !isFormValid())}>
            {isAnother && step === 1 ? t('common.next') : t('common.confirm')}
          </Button>
        </Actions>
      </ModalForm>
    </Overlay>
  );
};

export default AppointmentCreateModal;



