export class BaseApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends BaseApiError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends BaseApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseApiError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends BaseApiError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends BaseApiError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class InternalServerError extends BaseApiError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}
