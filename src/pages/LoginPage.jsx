import React from 'react';
import styled from 'styled-components';
import LoginForm from '../features/auth/ui/LoginForm';
import { useLogin } from '../features/auth/model/useLogin';
import { useLocation, useNavigate } from 'react-router-dom';

const CenteredWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundGradient};
`;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const { login, error, loading } = useLogin({ navigate, from });

  return (
    <CenteredWrapper>
      <LoginForm onLogin={login} error={error} loading={loading} />
    </CenteredWrapper>
  );
};

export default LoginPage;
