export class BaseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends BaseError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor(message = 'Method Not Allowed') {
    super(message, 405);
  }
}

export class RequestTimeoutError extends BaseError {
  constructor(message = 'Request Timeout') {
    super(message, 408);
  }
}

export class TooManyRequestsError extends BaseError {
  constructor(message = 'Too Many Requests') {
    super(message, 429);
  }
}

export class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}

export class ServiceUnavailableError extends BaseError {
  constructor(message = 'Service Unavailable') {
    super(message, 503);
  }
}

export class GatewayTimeoutError extends BaseError {
  constructor(message = 'Gateway Timeout') {
    super(message, 504);
  }
}
