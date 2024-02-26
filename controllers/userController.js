import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import userRepository from "../persistence/reposotories/userRepository.js";
import refreshTokenRepository from "../persistence/reposotories/refreshTokenRepository.js";
import { InvalidPasswordError, ExpiredAccessToken, InvalidAccessToken } from "../errors/CustomErrors.js";

class UserController {
    lifetime;
    secretKey;

    constructor(lifetime, secretKey) {
        this.lifetime = lifetime;
        this.secretKey = secretKey;
        this.login = this.login.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    createAccessToken(id, email) {
        var accessToken = jwt.sign(
            { id: id, email: email }, 
            this.secretKey, 
            { algorithm: 'HS512', expiresIn: this.lifetime});
        return accessToken;
    }
    verifyAccessToken(accessToken) {
        try {
            var decoded = jwt.verify(accessToken, this.secretKey, { algorithms: ['HS512'] } );
            return decoded;
        }
        catch(error) {
            if(error.expiredAt)
                throw new ExpiredAccessToken;
            else
                throw new InvalidAccessToken();
        }
    }

    async register(req, res) {
        const { email, password, nickname } = req.body;
        const user = await userRepository.createUser(email, password, nickname);
        res.status(200).json(user.id, user.email, user.nickname);
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await userRepository.readUser(email);

        if(!await bcrypt.compare(password, user.passwordHash)) {
            throw new InvalidPasswordError();
        }

        const accessToken = this.createAccessToken(user.id, user.email);

        const newRefreshToken = await refreshTokenRepository.create(user.id);
        console.log(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken.token, { expires: newRefreshToken.expirationTime, httpOnly: true });

        res.status(200).json(accessToken);
    }
    
    async aboutme(req, res) {

    }

    async delete(req, res) {

    }

    async update(req, res) {

    }
    async refresh(req, res) {       
        const oldRefreshToken = req.cookies.refreshToken;
        const { id, email } = req.body;
        refreshTokenRepository.delete(id, oldRefreshToken);

        const newRefreshToken = await refreshTokenRepository.create(id);
        const newAccessToken = this.createAccessToken(id, email);
        res.cookie('refreshToken', newRefreshToken.token, { expires: newRefreshToken.expirationTime, httpOnly: true  });
        res.status(200).json(newAccessToken);
    }
}

const userController = new UserController(config.get('access_token.lifetime'), config.get('access_token.secret_key'));
export default userController;