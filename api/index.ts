import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';

const app = express();

app.use(cors({ origin: 'http://example.com' }));
app.use(express.json());

app.use('/user', userRouter);
