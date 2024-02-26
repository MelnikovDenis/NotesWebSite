import { Router } from 'express';
import groupController from '../controllers/groupController.js';

const groupRouter = new Router();

groupRouter.post('/', groupController.create);
groupRouter.get('/:user_id', groupController.readMany);
groupRouter.get('/:group_id', groupController.readOne);
groupRouter.put('/', groupController.update);
groupRouter.delete('/', groupController.delete);

export default groupRouter;