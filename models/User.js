export class User {
    id;
    email;
    nickname;
    passwordHash;

    constructor(userId, email, nickname, passwordHash) {
        this.id = userId;
        this.email = email;
        this.nickname = nickname;
        this.passwordHash = passwordHash;
    }
};