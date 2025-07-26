import React from 'react';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from 'styled-components';
import { theme } from './shared/config/theme';
import { AuthProvider } from './features/auth/model/AuthContext';
import TokenRefreshManager from './features/auth/model/TokenRefreshManager';

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <TokenRefreshManager />
      <AppRouter />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
