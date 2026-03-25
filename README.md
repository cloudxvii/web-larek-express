<h1 align="center">WebLarek Backend</h1>

<div align="center">
  <img src="frontend/public/logo.svg" align="center" />
</div>
 

**WebLarek** - интернет-магазин для веб‑разработчиков. Проект реализует REST API для получения списка товаров, добавления новых товаров и оформления заказов. Сервер разработан на Node.js с использованием Express, TypeScript, MongoDB и Mongoose, с централизованной обработкой ошибок, валидацией данных и логированием.

---

## 🛠 Технологии

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier"/>
</div>

- **Node.js + Express** - основа сервера.
- **TypeScript** - типизация кода.
- **MongoDB + Mongoose** - хранение и управление данными товаров.
- **celebrate + Joi** - валидация входящих запросов.
- **winston + express-winston** - логирование запросов и ошибок.
- **cors** - настройка CORS.
- **ESLint (Airbnb) + Prettier** - единый стиль кода.

---

## ✨ Функциональность

- **GET /product** - получить список всех товаров.
- **POST /product** - создать новый товар (только для администрирования, без авторизации).
- **POST /order** - оформить заказ с проверкой наличия товаров, корректности суммы и контактных данных.
- **Раздача статики** - изображения товаров доступны по пути `/images/`.
- **Логирование** - все запросы и ошибки сохраняются в файлы `request.log` и `error.log` в формате JSON.
- **Централизованная обработка ошибок** - единый формат ответа с кодом и сообщением.

---

## 🔍 Особенности реализации

### Архитектура

Проект построен по принципу **модульной структуры**:

```
backend/
├── src/
│   ├── app.ts                 # Точка входа, настройка сервера, подключение к БД
│   ├── config.ts              # Конфигурация (порт, CORS, логирование)
│   ├── controllers/           # Обработчики запросов
│   │   ├── product.ts         # Контроллеры товаров
│   │   └── order.ts           # Контроллер заказов
│   ├── errors/                # Кастомные классы ошибок (400, 404, 409, 500)
│   ├── middlewares/           # Мидлвары
│   │   ├── errorHandler.ts    # Централизованный обработчик ошибок
│   │   ├── logger.ts          # Логгеры запросов и ошибок
│   │   ├── notFoundHandler.ts # Обработчик 404
│   │   └── validation.ts      # Валидация ID и тел запросов
│   ├── models/                # Mongoose-модели
│   │   └── product.ts         # Схема товара
│   ├── routes/                # Маршруты
│   │   ├── product.ts
│   │   └── order.ts
│   ├── schemas/               # Joi-схемы для celebrate
│   │   ├── productSchema.ts
│   │   └── orderSchema.ts
│   └── public/                # Статические файлы (изображения)
│       └── images/            # Картинки товаров
└── ... (конфиги, package.json)
```

### Валидация
- **На уровне схемы Mongoose**: проверка длины, уникальности, обязательности полей.
- **На уровне контроллера**: celebrate/Joi проверяет тело запроса и параметры URL перед передачей в контроллер.

### Обработка ошибок
- Созданы классы для каждого HTTP-статуса (`BadRequestError`, `NotFoundError`, `ConflictError`, `InternalServerError`).
- Все ошибки передаются в мидлвар `errorHandler`, который возвращает единообразный JSON `{ message: string }`.

### Логирование
- `requestLogger` сохраняет информацию о каждом запросе (метод, URL, тело, статус).
- `errorLogger` сохраняет информацию об ошибках.
- Логи пишутся в файлы `request.log` и `error.log` в корне проекта (игнорируются git).

### CORS
- Разрешены запросы с `http://localhost:3000` и `http://localhost:5173` (порты фронтенда).

---

## 🚦 Запуск проекта локально

### Требования
- Node.js 18+
- MongoDB (локально или через Docker)

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/web-larek-express.git
cd web-larek-express

# Перейдите в папку бэкенда
cd backend

# Установите зависимости
npm install

# Создайте файл .env (скопируйте .env.example)
cp .env.example .env
# При необходимости отредактируйте порт, адрес MongoDB и т.д.
```

### Запуск в режиме разработки

```bash
npm run dev
```

Сервер запустится на `http://localhost:3000` (порт из .env) с автоматическим перезапуском при изменениях.

### Сборка и запуск в продакшене

```bash
npm run build
npm run start
```

Скомпилированный код будет в папке `dist`.

### Запуск с Docker

В корне проекта есть `docker-compose.yml`, который поднимает MongoDB, бэкенд, фронтенд и nginx. Для использования:

```bash
docker-compose up -d
```

После этого API будет доступно по адресу `http://localhost/api`.

---

## 📌 API Документация

### GET /product
**Возвращает список всех товаров.**

#### Ответ (200 OK)
```json
{
  "items": [
    {
      "_id": "66601a8c57ecac94459696d6",
      "title": "Мамка-таймер",
      "image": {
        "fileName": "/images/Asterisk_2.png",
        "originalName": "Asterisk_2.png"
      },
      "category": "софт-скил",
      "description": "Будет стоять над душой и не давать прокрастинировать.",
      "price": null
    }
  ],
  "total": 1
}
```

#### Возможные ошибки
- **500 Internal Server Error** - ошибка базы данных.

---

### POST /product
**Создаёт новый товар.**  
*Тело запроса должно соответствовать схеме.*

#### Запрос
```json
{
  "description": "Будет стоять над душой и не давать прокрастинировать.",
  "image": {
    "fileName": "/images/Asterisk_2.png",
    "originalName": "Asterisk_2.png"
  },
  "title": "Мамка-таймер",
  "category": "софт-скил",
  "price": null
}
```

#### Ответ (201 Created)
```json
{
  "_id": "66601a8c57ecac94459696d6",
  "title": "Мамка-таймер",
  "image": {
    "fileName": "/images/Asterisk_2.png",
    "originalName": "Asterisk_2.png"
  },
  "category": "софт-скил",
  "description": "Будет стоять над душой и не давать прокрастинировать.",
  "price": null,
  "success": true,
  "message": "Product created successfully"
}
```

#### Возможные ошибки
- **400 Bad Request** - некорректные данные (отсутствие обязательных полей, неверный формат).
- **409 Conflict** - товар с таким `title` уже существует.
- **500 Internal Server Error** - ошибка базы данных.

---

### POST /order
**Оформляет заказ.**

#### Запрос
```json
{
  "payment": "online",        // "card" или "online"
  "email": "admin@ya.ru",
  "phone": "+7999999999",
  "address": "test",
  "total": 4200,
  "items": ["662e97d0c2fed29cab5bf3db", "662e97dec2fed29cab5bf3dd"]
}
```

#### Ответ (201 Created)
```json
{
  "id": "c1f83572-e756-4f82-809b-4c710fe51087",
  "total": 4200
}
```

#### Возможные ошибки
- **400 Bad Request**:
  - Не хватает обязательных полей.
  - `payment` не равен `card` или `online`.
  - Невалидный email.
  - Не указан `address` или `phone`.
  - Сумма `total` не совпадает с рассчитанной стоимостью товаров.
  - Один из товаров не найден или имеет `price = null` (не продаётся).
- **500 Internal Server Error** - ошибка базы данных.

---

## 🧪 Тестирование

Для тестирования API рекомендуется использовать коллекцию Postman, прилагаемую в репозитории:  
`WebLarek.postman_collection.json`

Импортируйте её в Postman, установите переменную `baseUrl` (по умолчанию `http://localhost:3000`).

---

## 📦 Переменные окружения

Файл `.env` должен содержать (пример в `.env.example`):

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/weblarek
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
LOG_LEVEL=info
```

- `PORT` - порт сервера.
- `MONGODB_URI` - строка подключения к MongoDB.
- `ALLOWED_ORIGINS` - разрешённые источники для CORS (через запятую).
- `LOG_LEVEL` - уровень логирования (info, debug и т.д.).

---

## 🖼 Макет и дизайн

Фронтенд для тестирования (на React) расположен в папке `frontend`.  
Макет интерфейса доступен по ссылке:  
[Figma - WebLarek](https://www.figma.com/design/kDLIKqinQZqMCzwNawUFhF/Yandex-(Веб-ларёк)?node-id=201-9445&t=iAnep42xbaXP6dwJ-0)

---

## 📝 Что реализовано

- Express-сервер на TypeScript с поддержкой CORS.
- Подключение к MongoDB через Mongoose.
- Модель товара с валидацией на уровне схемы.
- Контроллеры и маршруты для `/product` (GET, POST) и `/order` (POST).
- Валидация входящих данных через celebrate + Joi.
- Централизованная обработка ошибок с кастомными классами.
- Логирование запросов и ошибок в файлы.
- Раздача статических изображений из папки `public/images`.
- Поддержка переменных окружения через `dotenv`.
