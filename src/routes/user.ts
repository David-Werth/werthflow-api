import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getUserById,
	updateUserTasks,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/:id', getUserById);
userRouter.post('/:id', createUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUserTasks);

export default userRouter;
