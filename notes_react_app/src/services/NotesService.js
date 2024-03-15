import api from "../http/api.js";

export default class GroupService {
      static async createNote(id, title, text) {
            return api.post("/notes", { 
                  group_id: id, 
                  title: title, 
                  text: text});
      }
      static async readNotes(id) {            
            return api.get(`/groups/${id}/notes`);
      }
      static async updateNote(id, groupId, title, text) {
            return api.put("/notes", {
                  note_id: id, 
                  group_id: groupId,
                  new_title: title,
                  new_text: text});
      }
      static async deleteNote(id) {
            return api.delete("/notes", {data: { note_id: id } });
      }
}