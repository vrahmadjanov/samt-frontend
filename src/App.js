import React from 'react';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from 'styled-components';
import { theme } from './shared/config/theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
);

export default App;
