import { Router } from 'express';
import groupController from '../controllers/groupController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const groupRouter = new Router();

groupRouter.post('/', authenticationMiddleware,  groupController.create);
groupRouter.get('/:user_id', authenticationMiddleware,  groupController.readMany);
groupRouter.get('/:group_id', authenticationMiddleware,  groupController.readOne);
groupRouter.put('/', authenticationMiddleware,  groupController.update);
groupRouter.delete('/', authenticationMiddleware,  groupController.delete);

export default groupRouter;