export class Note { 
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
}