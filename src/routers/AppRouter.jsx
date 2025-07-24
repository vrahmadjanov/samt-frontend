import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      {routes.map(({ path, element, protected: isProtected }) => (
        <Route
          key={path}
          path={path}
          element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
        />
      ))}
    </Routes>
  </Router>
);

export default AppRouter;
