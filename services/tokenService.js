import jwt from 'jsonwebtoken';
import config from 'config';

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
            const refreshToken = await refreshTokenRepository.delete(userId, oldRefreshToken);
            if(refreshToken?.expirationTime > Date.now())
                  return true;
            else
                  return false;
      }
}

const tokenService = new TokenService(config.get('access_token.lifetime'), config.get('access_token.secret_key'));
export default tokenService;