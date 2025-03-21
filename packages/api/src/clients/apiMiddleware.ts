import { getAccessToken } from '@expo-webview-kit/utils/auth';
import type { Middleware } from 'openapi-fetch';
import {
  BadRequestError,
  BaseError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  RequestTimeoutError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
} from '../errors';

/**
 * @example
 */

export const apiMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = getAccessToken();

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return request;
  },
  async onResponse({ response }) {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new BadRequestError();
        case 401:
          throw new UnauthorizedError();
        case 403:
          throw new ForbiddenError();
        case 404:
          throw new NotFoundError();
        case 405:
          throw new MethodNotAllowedError();
        case 408:
          throw new RequestTimeoutError();
        case 429:
          throw new TooManyRequestsError();
        case 500:
          throw new InternalServerError();
        case 503:
          throw new ServiceUnavailableError();
        case 504:
          throw new GatewayTimeoutError();
        default:
          throw new BaseError(response.statusText, response.status);
      }
    }

    return response;
  },
};
