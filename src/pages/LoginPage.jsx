import React from 'react';
import styled from 'styled-components';
import LoginForm from '../features/auth/ui/LoginForm';
import { useLogin } from '../features/auth/model/useLogin';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
`;

const LoginPage = () => {
  const { login, error, loading } = useLogin();

  return (
    <PageWrapper>
      <LoginForm onLogin={login} error={error} loading={loading} />
    </PageWrapper>
  );
};

export default LoginPage;
