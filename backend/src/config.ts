import 'dotenv/config';

const config = {
  // Настройки сервера
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Настройки базы данных
  database: {
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weblarek',
  },

  // Настройки CORS
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  },

  // Настройки логгирования
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logFiles: {
      requests: 'request.log',
      errors: 'error.log',
    },
  },
};

export default config;
