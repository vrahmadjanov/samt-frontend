import React from 'react';
import AppRouter from './routers/AppRouter';
import Layout from './shared/components/organisms/Layout';

const App = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
