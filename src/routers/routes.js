import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainPage from '../pages/MainPage';
import DoctorsPage from '../pages/DoctorsPage';
import ClinicsPage from '../pages/ClinicsPage';

export const routes = [
  {
    path: '/',
    element: <MainPage />,
    protected: true, // Защищенный маршрут - требует авторизации
  },
  {
    path: '/login',
    element: <LoginPage />,
    public: true, // Публичный маршрут - только для неавторизованных
  },
  {
    path: '/register',
    element: <RegisterPage />,
    public: true, // Публичный маршрут - только для неавторизованных
  },
  {
    path: '/doctors',
    element: <DoctorsPage />,
    protected: true, // Защищенный маршрут - требует авторизации
  },
  {
    path: '/clinics',
    element: <ClinicsPage />,
    protected: true, // Защищенный маршрут - требует авторизации
  },
];
