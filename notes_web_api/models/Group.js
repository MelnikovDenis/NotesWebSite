import { RequestDataError } from "../errors/CustomErrors.js";

export class Group { 
    static maxNameLength = 100;
    static minNameLength = 1;
    id;
    userId;
    name;
    creationTime;
    lastUpdateTime;

    constructor(id, userId, name, creationTime, lastUpdateTime) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.creationTime = creationTime;
        this.lastUpdateTime = lastUpdateTime;
    }

    static checkId(id) {
        if(typeof(id) != 'number')
            throw new RequestDataError('Request body must contain id and id must be a number');
    }
    static checkUserId(userId) {
        if(typeof(userId) != 'number')
            throw new RequestDataError('Request body must contain userId and userId must be a number');
    }
    static checkName(name) {
        if(typeof(name) != 'string' || name.length > this.maxNameLength || name.length < this.minNameLength)
            throw new RequestDataError(`Request body must contain name and name must be a string with length in range [${this.minNameLength}, ${this.maxNameLength}]`);
    }
}