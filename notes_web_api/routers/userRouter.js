import { Router } from 'express';
import userController from '../controllers/userController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const userRouter = new Router();

userRouter.get('/', authenticationMiddleware, userController.aboutme);
userRouter.put('/', authenticationMiddleware, userController.update);
userRouter.delete('/', authenticationMiddleware, userController.delete);

export default userRouter;