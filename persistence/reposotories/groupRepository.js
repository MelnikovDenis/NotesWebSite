import { Group } from "../../models/Group.js";
import { query } from '../db.js';

class GroupRepository {
    constructor() {
        
    }

    async createGroup(groupUserId, groupName) {
        const paramQuery = {
            rowMode: 'array',
            text: 'INSERT INTO note_group(group_user_id, group_name, group_creation_time, group_last_update_time) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
            values: [groupUserId, groupName]
        };
        const result = await query(paramQuery);
        return new Group(result.rows[0][0], 
            result.rows[0][2], 
            result.rows[0][1],
            result.rows[0][3], 
            result.rows[0][4]);
    }

    async readGroups(groupUserId) {
        const paramQuery = {
            rowMode: 'array',
            text: 'SELECT group_id, group_user_id, group_name, group_creation_time, group_last_update_time FROM note_group WHERE group_user_id = $1',
            values: [groupUserId]
        };
        const result = await query(paramQuery);
        var groups = [];
        for(i = 0; i < result.rowsCount; ++i) {
            groups[i] = new Group(result.rows[i][0], result.rows[i][1], result.rows[i][2], result.rows[i][3], result.rows[i][4]);
        }
        return groups;
    }

    async readGroup(groupId) {
        const paramQuery = {
            rowMode: 'array',
            text: 'SELECT group_id, group_user_id, group_name, group_creation_time, group_last_update_time FROM note_group WHERE group_id = $1',
            values: [groupId]
        };
        const result = await query(paramQuery);

        if(result.rowCount > 0)
            return new Group(result.rows[0][0], 
                result.rows[0][1], 
                result.rows[0][2], 
                result.rows[0][3], 
                result.rows[0][4]);
        else
            return null;
    }

    async updateGroup(groupId, groupName) {
        const paramQuery = {
            text: 'UPDATE note_group SET group_name = $1, group_last_update_time = CURRENT_TIMESTAMP WHERE group_id = $2 RETURNING *',
            values: [groupName, groupId]
        };
        const result = await query(paramQuery);
        if(result.rowCount > 0)
            return new Group(result.rows[0][0], 
                result.rows[0][2], 
                result.rows[0][1],
                result.rows[0][3], 
                result.rows[0][4]);
        else
            return null;
    }

    async deleteGroup(groupId) {
        const paramQuery = {
            text: 'DELETE FROM note_group WHERE group_id = $1 RETURNING *',
            values: [groupId]
        };
        const result = await query(paramQuery);
        if(result.rowCount > 0)
            return new Group(result.rows[0][0], 
                result.rows[0][2], 
                result.rows[0][1],
                result.rows[0][3], 
                result.rows[0][4]);
        else
            return null;
    }
};

const groupRepository = new GroupRepository();
export default groupRepository;