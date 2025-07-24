import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainPage from '../pages/MainPage';

export const routes = [
  {
    path: '/',
    element: <MainPage />,
    protected: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    protected: false,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    protected: false,
  },
];
