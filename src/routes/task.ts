import { Router } from 'express';
import {
	createTask,
	deleteTask,
	getTaskById,
	updateTask,
} from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.post('/:id', createTask);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;
