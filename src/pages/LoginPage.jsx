import React from 'react';
import LoginForm from '../features/auth/ui/LoginForm';
import { useLogin } from '../features/auth/model/useLogin';
import CenteredWrapper from '../shared/components/atoms/CenteredWrapper';

const LoginPage = () => {
  const { login, error, loading } = useLogin();

  return (
    <CenteredWrapper>
      <LoginForm onLogin={login} error={error} loading={loading} />
    </CenteredWrapper>
  );
};

export default LoginPage;
