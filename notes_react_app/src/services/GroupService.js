import api from "../http/api.js";

export default class GroupService {
      static async createGroup(name) {
            return api.post("/groups", { name: name });
      }
      static async readGroups() {            
            return api.get("/groups");
      }
      static async updateGroup(id, name) {
            return api.put("/groups", {group_id: id, new_name: name});
      }
      static async deleteGroup(id) {
            return api.delete("/groups", {data: {group_id: id}});
      }
}