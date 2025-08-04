import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainPage from '../pages/MainPage';
import DoctorsPage from '../pages/DoctorsPage';
import ClinicsPage from '../pages/ClinicsPage';
import ProfilePage from '../pages/ProfilePage';
import PatientProfileDetailsPage from '../pages/PatientProfileDetailsPage';
import AppointmentsPage from '../pages/AppointmentsPage';

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
  {
    path: '/appointments',
    element: <AppointmentsPage />,
    protected: true, // Защищенный маршрут - требует авторизации
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    protected: true, // Защищенный маршрут - требует авторизации
  },
  {
    path: '/profile/details',
    element: <PatientProfileDetailsPage />,
    protected: true, // Защищенный маршрут - требует авторизации
  },
];
