import React, { useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../../ui/components/Form/BaseForm';
import Input from '../../../ui/components/Input/Input';
import Button from '../../../ui/components/Button/Button';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(formData); // делегируем авторизацию вверх
    }
  };

  return (
    <BaseForm title="Вход в систему" onSubmit={handleSubmit}>
      <Input
        label="Номер телефона"
        name="phone"
        type="tel"
        placeholder="+992 9XX XXX XXX"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        placeholder="Введите пароль"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit">Войти</Button>
      <RegisterBlock>
        Нет аккаунта?{' '}
        <StyledLink to="/register">
          Зарегистрируйтесь
        </StyledLink>
      </RegisterBlock>
    </BaseForm>
  );
};

export default LoginForm;

const RegisterBlock = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #4b5563; /* серый цвет */
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #3b82f6; /* синий акцент */
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
