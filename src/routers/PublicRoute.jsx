import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../features/auth/model/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  // Показываем загрузку пока проверяется авторизация
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Загрузка...
      </div>
    );
  }

  // Если пользователь авторизован, перенаправляем на главную страницу
  if (isAuthenticated) {
    // Сохраняем информацию о том, откуда пользователь пришел
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute; 