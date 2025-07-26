# Документация по механизму авторизации

## Обзор

Реализован качественный механизм авторизации с использованием JWT Bearer токенов по лучшим практикам. Система обеспечивает автоматическое обновление токенов, безопасное хранение и обработку ошибок.

## Архитектура

### Основные компоненты

1. **tokenService** (`src/entities/user/tokenService.js`)
   - Управление токенами в localStorage
   - Проверка валидности токенов
   - Извлечение информации о пользователе

2. **tokenAPI** (`src/entities/user/api.js`)
   - API для работы с токенами
   - Автоматическое обновление токенов
   - Обработка ошибок авторизации

3. **authService** (`src/entities/user/service.js`)
   - Бизнес-логика авторизации
   - Интеграция с API
   - Управление состоянием пользователя

4. **useAuth** (`src/features/auth/model/useAuth.js`)
   - React хук для управления авторизацией
   - Централизованное состояние
   - Автоматическая проверка токенов

5. **AuthContext** (`src/features/auth/model/AuthContext.jsx`)
   - React Context для глобального состояния авторизации
   - Провайдер для всего приложения

## Функциональность

### Автоматическое обновление токенов

- **TokenRefreshManager** автоматически обновляет токены за 5 минут до истечения
- Проверка токенов каждые 4 минуты
- Очередь запросов при одновременном обновлении токенов

### Безопасность

- Проверка структуры JWT токенов
- Валидация срока действия с буфером времени
- Автоматическая очистка токенов при ошибках
- Безопасное хранение в localStorage

### Обработка ошибок

- Детальная обработка ошибок API
- Автоматический редирект на логин при истечении токенов
- Логирование ошибок для отладки

## API Endpoints

### Авторизация
```
POST /api/token/
Body: { "phone_number": "+992123123123", "password": "adminadmin" }
```

### Обновление токена
```
POST /api/token/refresh/
Body: { "refresh": "refresh_token_here" }
```

### Проверка токена
```
POST /api/token/verify/
Body: { "token": "access_token_here" }
```

## Использование

### В компонентах

```javascript
import { useAuthContext } from '../features/auth/model/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuthContext();
  
  // Использование состояния авторизации
  if (loading) return <div>Загрузка...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <div>Добро пожаловать, {user?.first_name}!</div>
      ) : (
        <div>Пожалуйста, войдите в систему</div>
      )}
    </div>
  );
};
```

### Защищенные маршруты

```javascript
import ProtectedRoute from './routers/ProtectedRoute';

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } 
    />
  </Routes>
);
```

### Авторизация пользователя

```javascript
const { login } = useAuthContext();

const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    // Пользователь автоматически перенаправляется
  } catch (error) {
    console.error('Ошибка авторизации:', error.message);
  }
};
```

## Конфигурация

### Настройка перехватчиков

Перехватчики автоматически настраиваются при импорте `api.js`:

```javascript
import { setupAuthInterceptors } from './entities/user/api';
// Перехватчики настраиваются автоматически
```

### Настройка провайдеров

```javascript
import { AuthProvider } from './features/auth/model/AuthContext';

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
```

## Лучшие практики

1. **Автоматическое обновление**: Токены обновляются автоматически без вмешательства пользователя
2. **Безопасность**: Проверка структуры и валидности токенов
3. **UX**: Плавные переходы и индикаторы загрузки
4. **Обработка ошибок**: Детальная обработка всех возможных ошибок
5. **Производительность**: Кэширование состояния и оптимизированные запросы

## Отладка

### Проверка токенов

```javascript
import tokenService from './entities/user/tokenService';

// Проверка валидности токена
console.log('Access token valid:', tokenService.isAccessTokenValid());

// Декодирование токена для отладки
const decoded = tokenService.decodeToken(tokenService.getAccessToken());
console.log('Token payload:', decoded);
```

### Логирование

Все ошибки авторизации логируются в консоль для отладки.

## Безопасность

- Токены хранятся в localStorage (для production рекомендуется httpOnly cookies)
- Автоматическая очистка токенов при ошибках
- Проверка структуры JWT перед использованием
- Буфер времени для предотвращения проблем с синхронизацией 