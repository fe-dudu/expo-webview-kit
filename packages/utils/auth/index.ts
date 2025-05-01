import { safeLocalStorage } from '@toss/storage';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_NAME = 'expo-webview-kit-user-access-token';
const REFRESH_TOKEN_NAME = 'expo-webview-kit-user-refresh-token';

export const setTokens = (accessToken: string, refreshToken: string): void => {
  const { exp: refreshTokenExpirationTime } = jwtDecode<{ exp: number }>(refreshToken);

  safeLocalStorage.set(ACCESS_TOKEN_NAME, accessToken);
  Cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
    expires: new Date(refreshTokenExpirationTime * 1000),
    secure: true,
    path: '/',
    sameSite: 'Lax',
  });
};

export const getAccessToken = (): string => {
  return safeLocalStorage.get(ACCESS_TOKEN_NAME) ?? '';
};

export const getRefreshToken = (): string => {
  return Cookies.get(REFRESH_TOKEN_NAME) ?? '';
};

export const removeTokens = (): void => {
  safeLocalStorage.remove(ACCESS_TOKEN_NAME);
  Cookies.remove(REFRESH_TOKEN_NAME);
};
