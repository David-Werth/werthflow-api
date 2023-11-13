import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import userRouter from './routes/user';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(
	cors({
		origin: 'https://werthflow.davidwerth.com',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: '👋 Welcome to the WerthFlow API',
	});
});

app.use('/user', userRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
