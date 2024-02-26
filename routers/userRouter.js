import { Router } from 'express';
import userController from '../controllers/userController.js';

const userRouter = new Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/aboutme', userController.aboutme);
userRouter.post('/refresh', userController.refresh);
userRouter.put('/', userController.update);
userRouter.delete('/', userController.delete);

export default userRouter;