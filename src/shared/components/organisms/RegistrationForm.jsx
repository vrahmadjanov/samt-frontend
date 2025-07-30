import React, { useState } from 'react';
import BaseForm from '../molecules/BaseForm';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RegistrationStepper = ({ onRegister, districts, genders, errors, loading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    phone_number: '',
    date_of_birth: '',
    district: '',
    gender: '',
    password: '',
    password2: '',
    agree: false,
  });
  const [touched, setTouched] = useState({});

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.first_name && formData.phone_number;
    }
    if (step === 2) {
      return formData.date_of_birth && formData.district && formData.gender;
    }
    if (step === 3) {
      return (
        formData.password &&
        formData.password2 &&
        formData.password === formData.password2 &&
        formData.agree
      );
    }
    return false;
  };

  const handleNext = e => {
    e.preventDefault();
    if (validateStep()) setStep(step + 1);
    else setTouched(prev => ({ ...prev, all: true }));
  };

  const handleBack = e => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateStep()) {
      const data = { ...formData };
      delete data.password2;
      delete data.agree;
      onRegister(data);
    } else {
      setTouched(prev => ({ ...prev, all: true }));
    }
  };

  return (
    <BaseForm title="Регистрация" onSubmit={step === 3 ? handleSubmit : handleNext}>
      {step === 1 && (
        <>
          <Input
            label="Имя"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            error={touched.all && !formData.first_name ? 'Введите имя' : undefined}
            placeholder="Введите имя"
          />
          <Input
            label="Номер телефона"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            required
            error={touched.all && !formData.phone_number ? 'Введите номер' : undefined}
            placeholder="+992XXXXXXXXX"
          />
        </>
      )}
      {step === 2 && (
        <>
          <Input
            label="Дата рождения"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            error={touched.all && !formData.date_of_birth ? 'Укажите дату рождения' : undefined}
            placeholder="ГГГГ-ММ-ДД"
          />
          <Select
            label="Район"
            name="district"
            value={formData.district}
            onChange={handleChange}
            options={districts}
            required
            error={touched.all && !formData.district ? 'Выберите район' : undefined}
            placeholder="Выберите район"
          />
          <Select
            label="Пол"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genders}
            required
            error={touched.all && !formData.gender ? 'Выберите пол' : undefined}
            placeholder="Выберите пол"
          />
        </>
      )}
      {step === 3 && (
        <>
          <Input
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={touched.all && !formData.password ? 'Введите пароль' : undefined}
            placeholder="Минимум 8 символов"
          />
          <Input
            label="Подтвердите пароль"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            required
            error={touched.all && formData.password !== formData.password2 ? 'Пароли не совпадают' : undefined}
            placeholder="Повторите пароль"
          />
          <CheckboxRow>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
              id="agree"
            />
            <label htmlFor="agree" style={{ fontSize: '14px', marginLeft: 8 }}>
              Я принимаю <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">условия обработки персональных данных</a>
            </label>
          </CheckboxRow>
        </>
      )}
      <Button type="submit" disabled={loading}>
        {loading
          ? 'Регистрация...'
          : step === 3
          ? 'Зарегистрироваться'
          : 'Далее'}
      </Button>
      {step > 1 && (
        <Button type="button" onClick={handleBack} style={{ marginTop: 8, background: '#eee', color: '#222' }}>
          Назад
        </Button>
      )}
      <LoginBlock>
        Есть аккаунт?{' '}
        <StyledLink to="/login">
          Войдите
        </StyledLink>
      </LoginBlock>
    </BaseForm>
  );
};

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const LoginBlock = styled.div`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.font.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default RegistrationStepper; 