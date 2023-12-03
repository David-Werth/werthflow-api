import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getUserById,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/:id', createUser);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUser);

export default userRouter;
