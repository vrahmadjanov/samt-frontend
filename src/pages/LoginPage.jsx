import React from 'react';
import styled from 'styled-components';
import LoginForm from '../features/auth/ui/LoginForm';
import { useLogin } from '../features/auth/model/useLogin';
import { useLocation, useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
`;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const { login, error, loading } = useLogin({ navigate, from });

  return (
    <PageWrapper>
      <LoginForm onLogin={login} error={error} loading={loading} />
    </PageWrapper>
  );
};

export default LoginPage;
