import jwt from 'jsonwebtoken';
import config from 'config';
import refreshTokenRepository from '../persistence/reposotories/refreshTokenRepository';
import { AuthenticationError } from '../errors/CustomErrors.js';
import { RefreshToken } from '../models/RefreshToken.js';

class TokenService {
      lifetime;
      secretKey;
  
      constructor(lifetime, secretKey) {
          this.lifetime = lifetime;
          this.secretKey = secretKey;
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
            RefreshToken.checkToken(oldRefreshToken);

            const refreshToken = await refreshTokenRepository.read(userId, oldRefreshToken);
            if(!refreshToken || refreshToken.expirationTime > Date.now())
                  throw new AuthenticationError('Incorrect refresh token');

            await refreshTokenRepository.delete(userId, oldRefreshToken);
      }
}

const tokenService = new TokenService(config.get('access_token.lifetime'), config.get('access_token.secret_key'));
export default tokenService;