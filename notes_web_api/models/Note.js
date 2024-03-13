import { RequestDataError } from "../errors/CustomErrors.js";

export class Note { 
    static maxTitleLength = 100;
    static minTitleLength = 1;
    static maxTextLength = 2000;

    id;
    groupId;
    title;
    text;
    creationTime;
    lastUpdateTime;

    constructor(id, groupId, title, text, creationTime, lastUpdateTime) {
        this.id = id;
        this.groupId = groupId;
        this.title = title;
        this.text = text;
        this.creationTime = creationTime;
        this.lastUpdateTime = lastUpdateTime;
    }

    static checkId(id) {
        if(typeof(id) != 'number')
            throw new RequestDataError('Request body must contain id and id must be a number');
    }
    static checkGroupId(groupId) {
        if(typeof(groupId) != 'number')
            throw new RequestDataError('Request body must contain groupId and userId must be a number');
    }
    static checkTitle(title) {
        if(typeof(title) != 'string' || title.length > this.maxTitleLength || title.length < this.minTitleLength)
            throw new RequestDataError(`Request body must contain title and title must be a string with length in range [${this.minTitleLength}, ${this.maxTitleLength}]`);
    }
    static checkText(text) {
        if(typeof(text) != 'string' || text.length > this.maxTextLength)
            throw new RequestDataError(`Request body must contain text and text must be a string with length <= ${this.maxTextLength}`);
    }
}