# Архитектура и структура проекта

## Основные принципы
- **Feature-Sliced Design**: разделение кода по фичам, сущностям, shared-компонентам, процессам и виджетам.
- **Atomic Design**: UI-компоненты делятся на атомы, молекулы, организмы.
- **Разделение бизнес-логики и UI**: бизнес-логика реализуется через хуки (model), UI — через чистые компоненты (ui).
- **Переиспользуемость**: все общие компоненты и утилиты вынесены в shared.

## Структура src
```
src/
  app/                # Глобальные провайдеры, настройки
  entities/           # Сущности (user, district, gender) с api, service, model, types
  features/           # Фичи (auth и др.), каждая — отдельная папка с ui и model
  pages/              # Страницы (LoginPage, RegisterPage, ...)
  shared/             # Общие компоненты, хуки, утилиты, конфиги
    components/
      atoms/
      molecules/
      organisms/
    hooks/
    utils/
    config/
  widgets/            # Крупные виджеты, собирающие фичи и shared-компоненты
  processes/          # Сложные бизнес-процессы
```

## Пример паттернов
- **useLogin, useRegister, useVerification** — бизнес-логика вынесена в хуки features/auth/model
- **LoginForm, RegistrationForm, VerificationForm** — чистые UI-компоненты в features/auth/ui
- **Button, Input, Select, BaseForm** — атомы и молекулы в shared/components

## Масштабируемость
- Добавление новой фичи: создайте папку в features, ui и model внутри неё
- Добавление новой сущности: создайте папку в entities с api, service, model, types
- Все общие компоненты и утилиты — только в shared

## Рекомендации
- Соблюдайте разделение ответственности
- Пишите тесты для бизнес-логики и UI
- Документируйте архитектурные решения
