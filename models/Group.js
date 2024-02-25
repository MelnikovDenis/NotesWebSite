export class Group { 
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
}