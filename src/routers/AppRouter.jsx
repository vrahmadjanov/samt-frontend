import React from 'react';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../shared/components/organisms/Layout';

const AppRouterInner = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) {
    const route = routes.find(r => r.path === location.pathname);
    return route ? route.element : null;
  }
  return (
    <Layout>
      <Routes>
        {routes.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
          />
        ))}
      </Routes>
    </Layout>
  );
};

const AppRouter = () => (
  <Router>
    <AppRouterInner />
  </Router>
);

export default AppRouter;
