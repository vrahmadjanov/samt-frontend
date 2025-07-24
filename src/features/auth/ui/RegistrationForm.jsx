import React, { useState } from 'react';
import BaseForm from '../../../shared/components/molecules/BaseForm';
import Input from '../../../shared/components/atoms/Input';
import Button from '../../../shared/components/atoms/Button';
import Select from '../../../shared/components/atoms/Select';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RegistrationForm = ({ onRegister, districts, genders, errors, loading }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    phone_number: '',
    password: '',
    date_of_birth: '',
    district: '',
    gender: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Ошибки сбрасываются в useRegister
  };

  const handleSubmit = e => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <BaseForm title="Регистрация" onSubmit={handleSubmit}>
      <Input
        label="Имя"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
        error={errors?.first_name}
        placeholder="Введите имя"
      />
      <Input
        label="Номер телефона"
        name="phone_number"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
        required
        error={errors?.phone_number}
        placeholder="+992XXXXXXXXX"
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={errors?.password}
        placeholder="Минимум 8 символов"
      />
      <Input
        label="Дата рождения"
        name="date_of_birth"
        type="date"
        value={formData.date_of_birth}
        onChange={handleChange}
        required
        error={errors?.date_of_birth}
        placeholder="ГГГГ-ММ-ДД"
      />
      <Select
        label="Район"
        name="district"
        value={formData.district}
        onChange={handleChange}
        options={districts}
        required
        error={errors?.district}
        placeholder="Выберите район"
      />
      <Select
        label="Пол"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={genders}
        required
        error={errors?.gender}
        placeholder="Выберите пол"
      />
      <Button type="submit" disabled={loading}>{loading ? 'Регистрация...' : 'Зарегистрироваться'}</Button>
      <LoginBlock>
        Есть аккаунт?{' '}
        <StyledLink to="/login">
          Войдите
        </StyledLink>
      </LoginBlock>
    </BaseForm>
  );
};

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

export default RegistrationForm;
