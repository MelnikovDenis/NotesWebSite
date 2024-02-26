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
}