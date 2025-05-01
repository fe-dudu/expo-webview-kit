import { API } from '@/apis';
import Logo from '@/assets/logo.svg?react';
import { PATH } from '@/constants/path';
import { Card } from '@expo-webview-kit/ui/Card';
import { CardContent } from '@expo-webview-kit/ui/CardContent';
import { LoginForm } from '@expo-webview-kit/ui/LoginForm';
import { setTokens } from '@expo-webview-kit/utils/auth';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col w-full min-h-dvh gap-6">
      <div className="w-full max-w-sm flex justify-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-md">
          <Logo />
        </div>
      </div>

      <div className="w-full max-w-sm px-2">
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
