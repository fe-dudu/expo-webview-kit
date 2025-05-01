import { UnauthorizedError } from '../error';

export const retryFetch = async (url: RequestInfo | URL, token: string, init?: RequestInit): Promise<Response> => {
  const refreshInit: RequestInit = { ...init, headers: { ...init?.headers, Authorization: `Bearer ${token}` } };
  const retryResponse = await fetch(url, refreshInit);

  if (retryResponse.ok) {
    return retryResponse.json();
  }

  throw new UnauthorizedError();
};
