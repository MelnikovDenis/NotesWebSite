import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import userRepository from '../persistence/reposotories/userRepository.js';
import refreshTokenRepository from '../persistence/reposotories/refreshTokenRepository.js';
import { User } from '../models/User.js'
import { AlreadyExistsError, AuthenticationError, RequestDataError, NotFoundError } from '../errors/CustomErrors.js'; 

class UserController {
    lifetime;
    secretKey;

    constructor(lifetime, secretKey) {
        this.lifetime = lifetime;
        this.secretKey = secretKey;
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    async register(req, res, next) {        
        try {
            const { email, password, nickname } = req.body;
            User.checkEmail(email);
            User.checkPassword(password);
            User.checkNickname(nickname);
            const user = await userRepository.createUser(email, password, nickname);
            res.status(200).json({id: user.id, email: user.email, nickname: user.nickname});
        }
        catch(error) {
            if(error?.code == '23505')
                next(new AlreadyExistsError('User with this email already exist'));
            else
                next(error);
        }
    }

    async login(req, res, next) {
        try{
            const { email, password } = req.body;
            User.checkEmail(email);
            User.checkPassword(password);

            const user = await userRepository.readUser(email);
            if(!user || !await bcrypt.compare(password, user.passwordHash))
                throw new AuthenticationError();

            const accessToken = this.createAccessToken(user.id, user.email);
            const newRefreshToken = await refreshTokenRepository.create(user.id);
            res.cookie('refreshToken', newRefreshToken.token, { expires: newRefreshToken.expirationTime, httpOnly: true });
            res.status(200).json(accessToken);
        }
        catch(error) {
            next(error);
        }    
    }

    async refresh(req, res, next) {
        try{
            const oldRefreshToken = req.cookies?.refreshToken;
            if(typeof(oldRefreshToken) == 'string')
                throw new RequestDataError('Request cookie must contain refresh token and token must be a string');
            const { id, email } = req.body;        
            User.checkId(id);
            User.checkEmail(email);
            const newRefreshToken = await refreshTokenRepository.create(id);
            const newAccessToken = this.createAccessToken(id, email);
            res.cookie('refreshToken', newRefreshToken.token, { expires: newRefreshToken.expirationTime, httpOnly: true  });
            res.status(200).json(newAccessToken);
        }
        catch(error) {
            if(error?.code == '23505')
                next(new AlreadyExistsError('Token already exist'));
            else if(error?.code == '23503')
                next(new NotFoundError('User not found'));
            else
                next(error);
        }        
    }

    async aboutme(req, res) {

    }

    async delete(req, res) {

    }

    async update(req, res) {

    }

    

    createAccessToken(id, email) {
        var accessToken = jwt.sign(
            { id: id, email: email }, 
            this.secretKey, 
            { algorithm: 'HS512', expiresIn: this.lifetime});
        return accessToken;
    }
    verifyAccessToken(accessToken) {
        var decoded = jwt.verify(accessToken, this.secretKey, { algorithms: ['HS512'] });
        return decoded;
    }
    async verifyRefreshToken(userId, oldRefreshToken) {
        const refreshToken = await refreshTokenRepository.delete(userId, oldRefreshToken);
        if(refreshToken?.expirationTime > Date.now())
            return true;
        else
            return false;
    }
}

const userController = new UserController(config.get('access_token.lifetime'), config.get('access_token.secret_key'));
export default userController;