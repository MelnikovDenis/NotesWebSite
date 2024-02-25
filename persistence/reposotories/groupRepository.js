import { Group } from "../../models/Group.js";
import { query } from '../db.js';

class GroupRepository {
    constructor() {
        
    }

    async createGroup(groupUserId, groupName) {
        const paramQuery = {
            text: 'INSERT INTO note_group(group_user_id, group_name, group_creation_time, group_last_update_time) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
            values: [groupUserId, groupName]
        };
        await query(paramQuery);
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
        return new Group(result.rows[0][0], result.rows[0][1], result.rows[0][2], result.rows[0][3], result.rows[0][4]);
    }

    async updateGroup(groupId, groupName) {
        const paramQuery = {
            text: 'UPDATE note_group SET group_name = $1, group_last_update_time = CURRENT_TIMESTAMP WHERE group_id = $2',
            values: [groupName, groupId]
        };
        await query(paramQuery);
    }

    async deleteGroup(groupId) {
        const paramQuery = {
            text: 'DELETE FROM note_group WHERE group_id = $1',
            values: [groupId]
        };
        await query(paramQuery);
    }
};

const groupRepository = new GroupRepository();
export default groupRepository;