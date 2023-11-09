import { Router } from 'express';
import { createUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/:id', createUser);

export default userRouter;
