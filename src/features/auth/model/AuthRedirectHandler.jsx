import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const AuthRedirectHandler = () => {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Если загрузка завершена и пользователь не авторизован
    if (!loading && !isAuthenticated) {
      // Проверяем, находимся ли мы на странице авторизации
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';
      
      // Если не на странице авторизации, перенаправляем на логин
      if (!isAuthPage) {
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, loading, navigate]);

  // Компонент не рендерит ничего
  return null;
};

export default AuthRedirectHandler; 