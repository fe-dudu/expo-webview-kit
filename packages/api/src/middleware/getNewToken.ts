import { getAccessToken, getRefreshToken, removeTokens, setTokens } from '@expo-webview-kit/utils/auth';

export const getNewToken = (origin: string): Promise<string> => {
  if (window.refreshTokenPromise) {
    return window.refreshTokenPromise;
  }

  window.refreshTokenPromise = new Promise<string>((resolve) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken) {
      removeTokens();
      window.location.reload();
      resolve('');
    }

    fetch(`${origin}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })
      .then((resp) => resp.json())
      .then((resp) => resp.payload)
      .then(({ accessToken: newAccessToken, refreshToken: newRefreshToken }) => {
        setTokens(newAccessToken, newRefreshToken);
        resolve(newAccessToken);
      })
      .catch(() => {
        removeTokens();
        window.location.reload();
      })
      .finally(() => {
        window.refreshTokenPromise = null;
      });
  });

  return window.refreshTokenPromise;
};
