import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import userRouter from './routes/user';
import folderRouter from './routes/folder';
import sortableRouter from './routes/sortable';
import taskRouter from './routes/task';

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
app.use('/folder', folderRouter);
app.use('/sortable', sortableRouter);
app.use('/task', taskRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = 3000;

app.listen(port, () => console.log('Running on: ', port));

export default app;
