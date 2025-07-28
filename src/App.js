import React from 'react';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from 'styled-components';
import { theme } from './shared/config/theme';
import { AuthProvider } from './features/auth/model/AuthContext';
import TokenRefreshManager from './features/auth/model/TokenRefreshManager';
import { LanguageProvider } from './features/i18n/model/LanguageContext';

const App = () => (
  <ThemeProvider theme={theme}>
    <LanguageProvider>
      <AuthProvider>
        <TokenRefreshManager />
        <AppRouter />
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
