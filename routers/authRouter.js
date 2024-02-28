import { Router } from 'express';
import authController from '../controllers/authController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const authRouter = new Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authenticationMiddleware, authController.logout);

export default authRouter;