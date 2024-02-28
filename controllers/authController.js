import bcrypt from 'bcrypt';
import userRepository from '../persistence/reposotories/userRepository.js';
import refreshTokenRepository from '../persistence/reposotories/refreshTokenRepository.js';
import tokenService from '../services/tokenService.js';
import { User } from '../models/User.js'
import { AlreadyExistsError, AuthenticationError } from '../errors/CustomErrors.js'; 

class AuthController {
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
                        throw new AuthenticationError('Incorrect email or password');

                  const accessToken = tokenService.createAccessToken(user.id, user.email);
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
                  if(typeof(oldRefreshToken) != 'string')
                        throw new RequestDataError('Request cookie must contain refresh token and token must be a string');
                  const { id, email } = req.body;        
                  User.checkId(id);
                  User.checkEmail(email);
                  const newRefreshToken = await refreshTokenRepository.create(id);
                  const newAccessToken = tokenService.createAccessToken(id, email);
                  res.cookie('refreshToken', newRefreshToken.token, { expires: newRefreshToken.expirationTime, httpOnly: true, secure: true });
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
      
      async logout(req, res, next) {

      } 
}

const authController = new AuthController();
export default authController;