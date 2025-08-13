import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Layout from '../shared/components/organisms/Layout';
import { useAuthContext } from '../features/auth/model/AuthContext';
import AuthRedirectHandler from '../features/auth/model/AuthRedirectHandler';

const AppRouterInner = () => {
  const { isAuthenticated, loading } = useAuthContext();

  // Прокрутка страницы к верху при смене маршрута
  const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    React.useEffect(() => {
      // Если используется якорь — не мешаем штатной прокрутке к нему
      if (hash) return;
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname, hash]);
    return null;
  };

  // Показываем загрузку пока проверяется авторизация
  if (loading) {
    return null; // AuthLoader будет показан в ProtectedRoute
  }

  return (
    <>
      <ScrollToTop />
      <AuthRedirectHandler />
      <Routes>
        {routes.map(({ path, element, protected: isProtected, public: isPublic }) => {
          // Если маршрут защищенный
          if (isProtected) {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <Layout>{element}</Layout>
                  </ProtectedRoute>
                }
              />
            );
          }

          // Если маршрут публичный (только для неавторизованных)
          if (isPublic) {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <PublicRoute>
                    {element}
                  </PublicRoute>
                }
              />
            );
          }

          // Обычные маршруты (без Layout)
          return (
            <Route
              key={path}
              path={path}
              element={element}
            />
          );
        })}
        
        {/* Редирект с несуществующих маршрутов */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

const AppRouter = () => (
  <Router>
    <AppRouterInner />
  </Router>
);

export default AppRouter;
