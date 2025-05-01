import { useEffect } from 'react';
import { getRefreshToken, removeTokens } from '.';

export function TokenManager() {
  useEffect(() => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      removeTokens();
    }
  }, []);

  return null;
}
