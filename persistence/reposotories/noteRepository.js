import { Note } from "../../models/Note.js";
import { query } from '../db.js';

class NoteRepository {
    constructor() {
        
    }

    async createNote(groupId, noteTitle, noteText) {
        const paramQuery = {
            text: 'INSERT INTO note_note(note_group_id, note_title, note_text, note_creation_time, note_last_update_time) VALUES($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
            values: [groupId, noteTitle, noteText]
        };
        await query(paramQuery);
    }

    async readNotes(groupId) {
        const paramQuery = {
            rowMode: 'array',
            text: 'SELECT note_id, note_group_id, note_title, note_text, note_creation_time, note_last_update_time FROM note_note WHERE note_group_id = $1',
            values: [groupId]
        };
        const result = await query(paramQuery);
        var notes = [];
        for(i = 0; i < result.rowsCount; ++i) {
            groups[i] = new Note(result.rows[i][0], result.rows[i][1], result.rows[i][2], result.rows[i][3], result.rows[i][4], result.rows[i][5]);
        }
        return notes;
    }

    async readNote(noteId) {
        const paramQuery = {
            rowMode: 'array',
            text: 'SELECT note_id, note_group_id, note_title, note_text, note_creation_time, note_last_update_time FROM note_note WHERE note_id = $1',
            values: [noteId]
        };
        const result = await query(paramQuery);
        return new Note(result.rows[0][0], result.rows[0][1], result.rows[0][2], result.rows[0][3], result.rows[0][4], result.rows[0][5]);
    }

    async updateNote(groupId, newNoteTitle, oldNoteTitle, noteText) {
        const paramQuery = {
            text: 'UPDATE note_note SET note_title = $1, note_text = $2, group_last_update_time = CURRENT_TIMESTAMP WHERE note_group_id = $3 AND note_title = $4',
            values: [newNoteTitle, noteText, groupId, oldNoteTitle]
        };
        await query(paramQuery);
    }

    async deleteNote(noteId) {
        const paramQuery = {
            text: 'DELETE FROM note_note WHERE note_id = $1',
            values: [noteId]
        };
        await query(paramQuery);
    }
}

const noteRepository = new NoteRepository();
export default noteRepository;