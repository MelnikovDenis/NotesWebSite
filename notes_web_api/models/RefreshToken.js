import { RequestDataError } from "../errors/CustomErrors.js";

export class RefreshToken {
      static maxTokenLength = 50;

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
            if(typeof(token) != 'string' || token.length > this.maxTokenLength)
                  throw new RequestDataError(`Request cookie must contain refresh token and token must be a string with length <= ${this.maxTokenLength}`); 
      }
}