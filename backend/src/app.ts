import 'dotenv/config';
import config from './config';

import cors from 'cors';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import orderRouter from './routes/order';
import productRouter from './routes/product';

import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();

app.use(cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
  methods: config.cors.allowedMethods,
  allowedHeaders: config.cors.allowedHeaders,
}));

mongoose.connect(config.database.mongoUri);

app.use(requestLogger);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/order', orderRouter);
app.use('/product', productRouter);

app.use(errorLogger);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.server.port, () => {});
