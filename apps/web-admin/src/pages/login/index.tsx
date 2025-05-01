import { API } from '@/apis';
import Logo from '@/assets/logo.svg?react';
import { PATH } from '@/constants/path';
import { LoginForm } from '@expo-webview-kit/ui/LoginForm';
import { LoginLayout } from '@expo-webview-kit/ui/LoginLayout';
import { setTokens } from '@expo-webview-kit/utils/auth';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();

  return (
    <LoginLayout logo={<Logo />}>
      <LoginForm
        onSubmit={async (email, password) => {
          try {
            const { data } = await API.POST('/api/auth/login', {
              body: { email: email, password: password },
            });
            const { payload } = data || {};

            if (!payload) {
              throw new Error();
            }

            setTokens(payload.accessToken, payload.refreshToken);
            navigate(PATH.HOME);
          } catch {
            toast.warning('Please check your email and password.');
          }
        }}
      />
    </LoginLayout>
  );
}
