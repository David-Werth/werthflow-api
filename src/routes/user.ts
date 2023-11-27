import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/:id', createUser);
userRouter.put('/:id', updateUser);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUser);

export default userRouter;
