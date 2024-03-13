import { RequestDataError } from '../errors/CustomErrors.js'
export class User {
    static maxEmailLength = 300;
    static maxNicknameLength = 50;
    static maxPasswordLength = 30;

    static minEmailLength = 2;
    static minNickNameLength = 2;
    static minPasswordLength = 8;

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

    static checkId(id) {
        if(typeof(id) != 'number')
            throw new RequestDataError('Request must contain id and id must be a number');
    }
    static checkEmail(email) {
        if(typeof(email) != 'string' || email.length > this.maxEmailLength || email.length < this.minEmailLength)
            throw new RequestDataError(`Request must contain email and email must be a string with length in range [${this.minEmailLength}, ${this.maxEmailLength}]`);
    }
    static checkNickname(nickname) {
        if(typeof(nickname) != 'string' || nickname.length > this.maxNicknameLength || nickname.length < this.minNicknameLength)
            throw new RequestDataError(`Request must contain nickname and nickname must be a string with length in range [${this.minNicknameLength}, ${this.maxNicknameLength}]`);
    }
    static checkPassword(password) {
        if(typeof(password) != 'string' || password.length > this.maxPasswordLength || password.length < this.minPasswordLength)
            throw new RequestDataError(`Request must contain password and password must be a string with length in range [${this.minPasswordLength}, ${this.maxPasswordLength}]`);
    }
};