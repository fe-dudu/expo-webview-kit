import Logo from '@/assets/logo.svg?react';
import { Card } from '@expo-webview-kit/ui/Card';
import { CardContent } from '@expo-webview-kit/ui/CardContent';
import { LoginForm } from '@expo-webview-kit/ui/LoginForm';
import { asyncNoop } from '@expo-webview-kit/utils/noop';

export function Login() {
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
            <LoginForm onSubmit={asyncNoop} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
