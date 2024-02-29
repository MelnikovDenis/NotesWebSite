import groupRepository from '../persistence/reposotories/groupRepository.js';
import noteRepository from '../persistence/reposotories/noteRepository.js';
import { Group } from '../models/Group.js';
import { AlreadyExistsError, NotFoundError } from '../errors/CustomErrors.js';

class GroupController {
    constructor() {

    }

    async create(req, res, next) {
        try {
            const userId = res.locals.id;

            const name = req.body?.name;
            Group.checkName(name);

            const group = await groupRepository.createGroup(userId, name);
            res.status(200).json(group);
        }
        catch(error) {
            if(error?.code == '23505')
                next(new AlreadyExistsError('Group already exist'));
            else if(error?.code == '23503')
                next(new NotFoundError('User was not found'));
            else
                next(error);
        }
    }

    async readMany(req, res, next) {
        try {
            const userId = res.locals.id;
            const groups = await groupRepository.readGroups(userId);
            res.status(200).json(groups);
        }
        catch(error) {
            next(error);
        }
    }

    async readOne(req, res, next) {
        try {
            const groupId = parseInt(req.params['group_id']);
            Group.checkId(groupId);

            var group = await groupRepository.readGroup(groupId);

            if(!group)
                throw new NotFoundError('Group was not found');

            group.notes = await noteRepository.readNotes(groupId);

            res.status(200).json(group);
        }
        catch(error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {      
            const groupId = req.body?.group_id;
            const name = req.body?.new_name;

            Group.checkId(groupId)
            Group.checkName(name);
           
            const rowCount = await groupRepository.updateGroup(groupId, name);

            if(rowCount == 0)
                throw new NotFoundError('Group was not found');

            res.status(200).send();
        }
        catch(error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const groupId = req.body?.group_id;

            Group.checkId(groupId);

            const rowCount = await groupRepository.deleteGroup(groupId);

            if(rowCount == 0)
                throw new NotFoundError('Group was not found');

            res.status(200).send();
        }
        catch(error) {
            next(error);
        }
    }
}

const groupController = new GroupController();
export default groupController;