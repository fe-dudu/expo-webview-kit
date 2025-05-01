import { PATH } from '@/constants/path';
import { getRefreshToken } from '@expo-webview-kit/utils/auth';
import { redirect } from 'react-router';

export function protectedLoader() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return redirect(PATH.LOGIN);
  }

  return null;
}
