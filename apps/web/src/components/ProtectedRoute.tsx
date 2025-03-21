import { PATH } from '@/constants/path';
import { getAccessToken } from '@expo-webview-kit/utils/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken && !pathname.startsWith(PATH.LOGIN)) {
      navigate(PATH.LOGIN, { replace: true });
    }
  }, [navigate, pathname]);

  return <>{children}</>;
}
