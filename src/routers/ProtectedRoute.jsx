import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import tokenService from '../entities/user/tokenService';

const ProtectedRoute = ({ children }) => {
  const token = tokenService.getAccessToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
