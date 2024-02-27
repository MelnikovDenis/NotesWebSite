class BaseError extends Error {
      statusCode;

      constructor(name, message, statusCode) {
            super();

            Object.setPrototypeOf(this, new.target.prototype);
            this.name = name;
            this.message = message;
            this.statusCode = statusCode;

            Error.captureStackTrace(this);
      }
}

class AlreadyExistsError extends BaseError {
      constructor(message) {
            super('ALREADY_EXISTS', message, 400);
      }
}

class NotFoundError extends BaseError {
      constructor(message) {
            super('NOT_FOUND', message, 404);
      }
}

class AuthenticationError extends BaseError {
      constructor() {
            super('AUTHENTICATION_ERROR', 'Incorrect email or password', 400);
      }
}

class RequestDataError extends BaseError {
      constructor(message) {
            super('DATA_TYPE_ERROR', message, 400);
      }
}

class UnknownDatabaseError extends BaseError {
      constructor() {
            super('UNKNOWN_DATABASE_ERROR', 'Unknown database error', 500);
      }
}

export { 
      AlreadyExistsError, 
      NotFoundError, 
      UnknownDatabaseError,
      RequestDataError,
      AuthenticationError
};