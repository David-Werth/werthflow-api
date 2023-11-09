import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req: Request, res: Response) => {
// 	res.send('Hello, TypeScript Express!');
// });

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
