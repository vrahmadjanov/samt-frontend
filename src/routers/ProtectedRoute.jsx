import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../features/auth/model/AuthContext';
import AuthLoader from '../shared/components/organisms/AuthLoader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  // Показываем загрузку пока проверяется авторизация
  if (loading) {
    return <AuthLoader />;
  }

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
