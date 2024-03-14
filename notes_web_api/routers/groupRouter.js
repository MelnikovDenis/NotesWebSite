import { Router } from 'express';
import groupController from '../controllers/groupController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import noteController from '../controllers/noteController.js';

const groupRouter = new Router();

groupRouter.post('/', authenticationMiddleware,  groupController.create);
groupRouter.get('/:group_id(\\d+)', authenticationMiddleware,  groupController.readOne);
groupRouter.get('/:group_id(\\d+)/notes', authenticationMiddleware, noteController.readMany);
groupRouter.get('/', authenticationMiddleware,  groupController.readMany);
groupRouter.put('/', authenticationMiddleware,  groupController.update);
groupRouter.delete('/', authenticationMiddleware,  groupController.delete);

export default groupRouter;