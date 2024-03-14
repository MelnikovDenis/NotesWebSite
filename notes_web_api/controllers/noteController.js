import { NotFoundError, AlreadyExistsError } from '../errors/CustomErrors.js';
import { Note } from '../models/Note.js';
import { Group } from '../models/Group.js';
import noteRepository from '../persistence/reposotories/noteRepository.js';

class NoteController {
    constructor() {

    }

    async create(req, res, next) {
        try {
            const groupId = req.body?.group_id;
            const title = req.body?.title;
            const text = req.body?.text;

            Note.checkGroupId(groupId);
            Note.checkTitle(title);
            Note.checkText(text);

            const note = await noteRepository.createNote(groupId, title, text);
            res.status(200).json(note);
        }
        catch(error) {
            if(error?.code == '23505')
                next(new AlreadyExistsError('Note already exist'));
            else if(error?.code == '23503')
                next(new NotFoundError('Group was not found'));
            else
                next(error);
        }
    }

    async readOne(req, res, next) {
        try {
            const noteId = parseInt(req.params['note_id']);

            Note.checkId(noteId);

            const note = await noteRepository.readNote(noteId);
            
            if(!note)
                throw new NotFoundError('Note was not found');

            res.status(200).json(note);
        }
        catch(error) {
            next(error);
        }
    }

    async readMany(req, res, next) {
        try {
            const groupId = parseInt(req.params['group_id']);

            Group.checkId(groupId);

            const notes = await noteRepository.readNotes(groupId);
            
            res.status(200).json(notes);
        }
        catch(error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const noteId = req.body?.note_id;
            const groupId = req.body?.new_group_id;
            const title = req.body?.new_title;
            const text = req.body?.new_text;

            Note.checkId(noteId);
            Note.checkGroupId(groupId);
            Note.checkTitle(title);
            Note.checkText(text);

            const rowCount = await noteRepository.updateNote(noteId, groupId, title, text);

            if(rowCount == 0)
                throw new NotFoundError('Note was not found');

            res.status(200).send();
        }
        catch(error) {
            if(error?.code == '23505')
                next(new AlreadyExistsError('Note already exist'));
            else if(error?.code == '23503')
                next(new NotFoundError('New group was not found'));
            else
                next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const noteId = req.body?.note_id;

            Note.checkId(noteId);

            const rowCount = await noteRepository.deleteNote(noteId);

            if(rowCount == 0)
                throw new NotFoundError('Note was not found');
            
            res.status(200).send();
        }
        catch(error) {
            next(error);
        }
    }
}

const noteController = new NoteController();
export default noteController;