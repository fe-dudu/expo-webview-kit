import { getAccessToken } from '@expo-webview-kit/utils/auth';
import { jwtDecode } from 'jwt-decode';
import type { Middleware } from 'openapi-fetch';
import {
  BadRequestError,
  BaseApiError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../error';
import { getNewToken } from './getNewToken';
import { retryFetch } from './retryFetch';

const TOKEN_REFRESH_THRESHOLD = 15 * 1000;
const bodyCache = new WeakMap<Request, BodyInit>();

export const apiMiddleware: Middleware = {
  async onRequest({ request }) {
    let accessToken = getAccessToken();

    if (accessToken) {
      const { exp } = jwtDecode<{ exp: number }>(accessToken);
      const expirationTime = exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration <= TOKEN_REFRESH_THRESHOLD) {
        const { origin } = new URL(request.url);
        accessToken = await getNewToken(origin);
      }

      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    if (request.method !== 'GET' && request.body) {
      const contentType = request.headers.get('Content-Type') || '';
      const cloned = request.clone();
      let clonedBody: BodyInit;

      if (contentType.includes('application/json')) {
        clonedBody = await cloned.text();
      } else if (contentType.includes('multipart/form-data')) {
        clonedBody = await cloned.formData();
      } else {
        clonedBody = await cloned.blob();
      }

      bodyCache.set(request, clonedBody);
    }

    return request;
  },
  async onResponse({ request, response }) {
    if (!response.ok) {
      const res = await response.json();

      switch (response.status) {
        case 400:
          throw new BadRequestError(res?.error);
        case 401: {
          const { origin } = new URL(request.url);
          const newToken = await getNewToken(origin);

          if (newToken) {
            return await retryFetch(request.url, newToken, {
              headers: request.headers,
              body: bodyCache.get(request),
              method: request.method,
            });
          }

          throw new UnauthorizedError();
        }
        case 403:
          throw new ForbiddenError(res?.error);
        case 404:
          throw new NotFoundError(res?.error);
        case 409:
          throw new ConflictError(res?.error);
        case 500:
          throw new InternalServerError(res?.error);
        default:
          throw new BaseApiError(res?.error, response.status);
      }
    }

    return response;
  },
};
