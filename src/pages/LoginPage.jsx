import React from 'react';
import styled from 'styled-components';
import LoginForm from '../features/auth/components/LoginForm';
import authService from '../services/authService';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
`;

const LoginPage = () => {
  const handleLogin = async ({ phone, password }) => {
    try {
      await authService.login({ phone, password });
      window.location.href = '/'; // или навигация через React Router
    } catch (error) {
      alert('Неверные данные или ошибка подключения.');
    }
  };

  return (
    <PageWrapper>
      <LoginForm onLogin={handleLogin} />
    </PageWrapper>
  );
};

export default LoginPage;
