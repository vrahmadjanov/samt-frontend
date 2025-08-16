# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve with static file server
FROM node:20-alpine
WORKDIR /app

# Установка serve для статических файлов
RUN npm install -g serve

# Копирование собранного приложения
COPY --from=build /app/build ./build

# Открытие порта
EXPOSE 3000

# Запуск статического сервера
CMD ["serve", "-s", "build", "-l", "3000"]