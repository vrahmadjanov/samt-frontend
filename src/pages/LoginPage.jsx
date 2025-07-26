import React from 'react';
import styled from 'styled-components';
import LoginForm from '../features/auth/ui/LoginForm';
import { useLogin } from '../features/auth/model/useLogin';

const CenteredWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

const LoginPage = () => {
  const { login, error, loading } = useLogin();

  return (
    <CenteredWrapper>
      <LoginForm onLogin={login} error={error} loading={loading} />
    </CenteredWrapper>
  );
};

export default LoginPage;
