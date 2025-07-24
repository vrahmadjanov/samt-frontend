import React from 'react';
import { Navigate } from 'react-router-dom';
import tokenService from '../entities/user/tokenService';

const ProtectedRoute = ({ children }) => {
  const token = tokenService.getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
