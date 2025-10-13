import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(cors());

const { PORT } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(express.json());

app.listen(PORT, () => {});