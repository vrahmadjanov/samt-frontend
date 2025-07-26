// Утилиты для работы с JWT токенами

/**
 * Декодирует JWT токен
 * @param {string} token - JWT токен
 * @returns {object|null} - Декодированный payload или null
 */
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Ошибка декодирования JWT токена:', error);
    return null;
  }
};

/**
 * Проверяет, истек ли токен
 * @param {string} token - JWT токен
 * @param {number} bufferSeconds - Буфер времени в секундах (по умолчанию 30)
 * @returns {boolean} - true если токен истек
 */
export const isTokenExpired = (token, bufferSeconds = 30) => {
  if (!token) return true;
  
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= (decoded.exp - bufferSeconds);
};

/**
 * Получает время истечения токена
 * @param {string} token - JWT токен
 * @returns {Date|null} - Дата истечения токена или null
 */
export const getTokenExpirationTime = (token) => {
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return null;
  
  return new Date(decoded.exp * 1000);
};

/**
 * Получает время до истечения токена в миллисекундах
 * @param {string} token - JWT токен
 * @returns {number|null} - Время до истечения в миллисекундах или null
 */
export const getTimeUntilExpiry = (token) => {
  if (!token) return null;
  
  const expirationTime = getTokenExpirationTime(token);
  if (!expirationTime) return null;
  
  return expirationTime.getTime() - Date.now();
};

/**
 * Проверяет, нужно ли обновить токен
 * @param {string} token - JWT токен
 * @param {number} thresholdMinutes - Порог в минутах (по умолчанию 5)
 * @returns {boolean} - true если токен нужно обновить
 */
export const shouldRefreshToken = (token, thresholdMinutes = 5) => {
  const timeUntilExpiry = getTimeUntilExpiry(token);
  if (timeUntilExpiry === null) return true;
  
  return timeUntilExpiry <= thresholdMinutes * 60 * 1000;
};

/**
 * Извлекает информацию о пользователе из токена
 * @param {string} token - JWT токен
 * @returns {object|null} - Информация о пользователе или null
 */
export const extractUserInfoFromToken = (token) => {
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  if (!decoded) return null;
  
  return {
    user_id: decoded.user_id,
    phone_number: decoded.phone_number,
    groups: decoded.group || [],
    subscription: decoded.subscription,
    token_type: decoded.token_type
  };
};

/**
 * Проверяет валидность структуры JWT токена
 * @param {string} token - JWT токен
 * @returns {boolean} - true если структура токена валидна
 */
export const isValidJWTStructure = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  return parts.length === 3;
}; 