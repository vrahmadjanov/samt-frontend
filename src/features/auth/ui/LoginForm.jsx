import React, { useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../../shared/components/molecules/BaseForm';
import Input from '../../../shared/components/atoms/Input';
import Button from '../../../shared/components/atoms/Button';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, error, loading }) => {
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
      onLogin(formData);
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
      {error && <ErrorBlock>{error}</ErrorBlock>}
      <Button type="submit" disabled={loading}>{loading ? 'Вход...' : 'Войти'}</Button>
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
  color: #4b5563;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorBlock = styled.div`
  color: #ef4444;
  text-align: center;
  margin-bottom: 8px;
  font-size: 14px;
`;
