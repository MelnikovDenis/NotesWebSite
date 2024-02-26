class BaseError extends Error {
      statusCode;

      constructor(name, statusCode) {
            super();

            Object.setPrototypeOf(this, new.target.prototype);
            this.name = name;
            this.statusCode = statusCode;

            Error.captureStackTrace(this);
      }
}

class AlreadyExistsError extends BaseError {
      constructor() {
            super('ALREADY_EXISTS', 400);
      }
}

class NotFoundError extends BaseError {
      constructor() {
            super('NOT_FOUND', 404);
      }
}

class UnknownDatabaseError extends BaseError {
      constructor() {
            super('UNKNOWN_DATABASE_ERROR', 500);
      }
}

class InvalidAccessToken extends BaseError {
      constructor() {
            super('INVALID_ACCESS_TOKEN', 400);
      }
}

class ExpiredAccessToken extends BaseError {
      constructor() {
            super('EXPIRED_REFRESH_TOKEN', 400);
      }
}

class InvalidRefreshToken extends BaseError {
      constructor() {
            super('INVALID_REFRESH_TOKEN', 400);
      }
}

class ExpiredRefreshToken extends BaseError {
      constructor() {
            super('EXPIRED_REFRESH_TOKEN', 400);
      }
}

class InvalidPasswordError extends BaseError {
      constructor() {
            super('INVALID_PASSWORD', 400);
      }
}

export { 
      AlreadyExistsError, 
      NotFoundError, 
      UnknownDatabaseError,
      InvalidAccessToken,
      ExpiredAccessToken,
      InvalidRefreshToken,
      ExpiredRefreshToken,
      InvalidPasswordError
};