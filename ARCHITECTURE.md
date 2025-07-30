# Архитектура проекта SAMT Frontend

## Обзор архитектуры

Проект использует Feature-Sliced Design (FSD) архитектуру с некоторыми адаптациями для React приложения.

## Структура проекта

```
src/
├── entities/          # Бизнес-сущности (API, сервисы)
├── features/          # Функциональные модули
│   ├── auth/         # Аутентификация
│   ├── clinic/       # Клиники
│   ├── doctor/       # Врачи
│   ├── i18n/         # Интернационализация
│   ├── main/         # Основная функциональность
│   └── patient/      # Пациенты
├── pages/            # Страницы приложения
├── shared/           # Общие компоненты и утилиты
│   ├── components/   # UI компоненты
│   │   ├── atoms/    # Атомарные компоненты
│   │   ├── molecules/# Молекулярные компоненты
│   │   └── organisms/# Организменные компоненты
│   ├── config/       # Конфигурация
│   ├── i18n/         # Интернационализация
│   └── utils/        # Утилиты
└── widgets/          # Виджеты (пока не используется)
```

## Принципы архитектуры

### 1. Разделение ответственности

- **Entities**: Содержат бизнес-логику и API вызовы
- **Features**: Содержат модель (хуки, логика) для конкретных функций
- **Shared**: Переиспользуемые компоненты и утилиты
- **Pages**: Композиция компонентов для создания страниц

### 2. Компонентная архитектура

#### Atoms (Атомы)
Базовые UI компоненты: `Button`, `Input`, `Card`, `ErrorMessage` и т.д.

#### Molecules (Молекулы)
Композиции атомов: `BaseForm`, `SearchAndFilter`, `FilterGroup` и т.д.

#### Organisms (Организмы)
Сложные компоненты: `LoginForm`, `RegistrationForm`, `ClinicCard`, `DoctorCard` и т.д.

### 3. Features структура

Каждый feature содержит только **model** папку с хуками и бизнес-логикой:

```
features/
├── auth/
│   └── model/
│       ├── useLogin.js
│       ├── useRegister.js
│       └── ...
├── clinic/
│   └── model/
│       ├── useClinics.js
│       ├── useClinicTypes.js
│       └── ...
└── ...
```

### 4. UI компоненты

Все UI компоненты находятся в `shared/components/`:

- **atoms/**: Базовые компоненты
- **molecules/**: Композиции атомов
- **organisms/**: Сложные компоненты (включая формы авторизации)

## Улучшения архитектуры

### ✅ Выполненные улучшения

1. **Удалена папка `hooks`** - неиспользуемый хук `useReferenceData`
2. **Удалены UI папки из features** - все UI компоненты перемещены в `shared/components/organisms`
3. **Унифицирована структура features** - теперь все features содержат только `model` папку
4. **Улучшена переиспользуемость** - UI компоненты теперь доступны из shared

### 📋 Преимущества новой архитектуры

1. **Единообразие**: Все features имеют одинаковую структуру
2. **Переиспользуемость**: UI компоненты доступны из shared
3. **Чистота**: Features содержат только бизнес-логику
4. **Масштабируемость**: Легко добавлять новые features и компоненты

## Правила разработки

### Создание нового feature

```
features/newFeature/
└── model/
    ├── useNewFeature.js
    └── useNewFeatureData.js
```

### Создание нового компонента

1. **Atom**: `shared/components/atoms/NewAtom.jsx`
2. **Molecule**: `shared/components/molecules/NewMolecule.jsx`
3. **Organism**: `shared/components/organisms/NewOrganism.jsx`

### Импорты

- **Из shared**: `import Component from '../shared/components/organisms/Component'`
- **Из features**: `import { useHook } from '../features/featureName/model/useHook'`
- **Из entities**: `import service from '../entities/entityName/service'`

## Примеры использования

### Страница с авторизацией
```jsx
import LoginForm from '../shared/components/organisms/LoginForm';
import { useLogin } from '../features/auth/model/useLogin';
```

### Страница со списком
```jsx
import ClinicList from '../shared/components/organisms/ClinicList';
import { useClinics } from '../features/clinic/model/useClinics';
```

Эта архитектура обеспечивает чистоту кода, переиспользуемость компонентов и легкость поддержки проекта. 