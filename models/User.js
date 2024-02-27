import { RequestDataError } from '../errors/CustomErrors.js'
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

    static checkId(id) {
        if(typeof(id) != 'number')
            throw new RequestDataError('Request body must contain id and id must be a number');
    }
    static checkEmail(email) {
        if(typeof(email) != 'string' || email.length > 200)
            throw new RequestDataError('Request body must contain email and email must be a string with length <= 200');
    }
    static checkNickname(nickname) {
        if(typeof(nickname) != 'string' || nickname.length > 30)
            throw new RequestDataError('Request body must contain nickname and nickname must be a string with length <= 30');
    }
    static checkPassword(password) {
        if(typeof(password) != 'string' || password.length > 30)
            throw new RequestDataError('Request body must contain password and password must be a string with length <= 30');
    }
};