export class RefreshToken {
      id;
      userId;
      token;
      creationTime;
      expirationTime;
      constructor(id, userId, token, creationTime, expirationTime) {
            this.id = id;
            this.userId = userId;
            this.token = token;
            this.creationTime = creationTime;
            this.expirationTime = expirationTime;
      }
      
      static checkToken(token) {
            if(typeof(token) != 'string' || token.length > 50)
                  throw new RequestDataError('Request cookie must contain refresh token and token must be a string with length <= 50'); 
      }
}