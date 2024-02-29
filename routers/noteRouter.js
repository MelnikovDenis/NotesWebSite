import { Router } from 'express';
import noteController from '../controllers/noteController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const noteRouter = new Router();

noteRouter.post('/', authenticationMiddleware, noteController.create);
noteRouter.get('/:note_id(\\d+)', authenticationMiddleware,  noteController.readOne);
noteRouter.put('/', authenticationMiddleware,  noteController.update);
noteRouter.delete('/', authenticationMiddleware,  noteController.delete);

export default noteRouter;