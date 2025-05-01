import { useEffect } from 'react';

export function RefreshTokenPromiseInjector() {
  useEffect(() => {
    window.refreshTokenPromise = null;
  }, []);

  return null;
}
