import { Router } from 'express';
import noteController from '../controllers/noteController.js';

const noteRouter = new Router();

noteRouter.post('/', noteController.create);
noteRouter.get('/:group_id', noteController.readMany);
noteRouter.get('/:note_id', noteController.readOne);
noteRouter.put('/', noteController.update);
noteRouter.delete('/', noteController.delete);

export default noteRouter;