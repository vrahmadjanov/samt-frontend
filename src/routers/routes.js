import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export const routes = [
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
