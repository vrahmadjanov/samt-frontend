import { 
  decodeJWT, 
  isTokenExpired, 
  getTokenExpirationTime, 
  extractUserInfoFromToken,
  isValidJWTStructure 
} from '../../shared/utils/jwtUtils';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'userData';

const tokenService = {
  getAccessToken: () => localStorage.getItem(ACCESS_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getUserData: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  
  setTokens: ({ access, refresh, user }) => {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  clearTokens: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  // Проверка валидности токена доступа
  isAccessTokenValid: () => {
    const token = localStorage.getItem(ACCESS_KEY);
    return token && isValidJWTStructure(token) && !isTokenExpired(token);
  },
  
  // Проверка валидности refresh токена
  isRefreshTokenValid: () => {
    const token = localStorage.getItem(REFRESH_KEY);
    return token && isValidJWTStructure(token) && !isTokenExpired(token);
  },
  
  // Получение информации о пользователе из токена
  getTokenUserInfo: () => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) return null;
    
    return extractUserInfoFromToken(token);
  },
  
  // Проверка авторизации пользователя
  isAuthenticated: () => {
    return tokenService.isAccessTokenValid() || tokenService.isRefreshTokenValid();
  },
  
  // Получение времени истечения токена
  getTokenExpirationTime: () => {
    const token = localStorage.getItem(ACCESS_KEY);
    return getTokenExpirationTime(token);
  },

  // Получение времени до истечения токена в миллисекундах
  getTimeUntilExpiry: () => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) return null;
    
    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) return null;
    
    return expirationTime.getTime() - Date.now();
  },

  // Проверка необходимости обновления токена
  shouldRefreshToken: (thresholdMinutes = 5) => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) return true;
    
    const timeUntilExpiry = tokenService.getTimeUntilExpiry();
    if (timeUntilExpiry === null) return true;
    
    return timeUntilExpiry <= thresholdMinutes * 60 * 1000;
  },

  // Декодирование токена для отладки
  decodeToken: (token) => {
    return decodeJWT(token);
  }
};

export default tokenService;
