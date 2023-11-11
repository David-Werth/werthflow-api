import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
