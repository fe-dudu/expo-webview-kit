import Logo from '@/assets/logo.svg?react';
import { LoginForm } from '@expo-webview-kit/ui/LoginForm';
import { LoginLayout } from '@expo-webview-kit/ui/LoginLayout';
import { asyncNoop } from '@expo-webview-kit/utils/noop';

export function Login() {
  return (
    <LoginLayout logo={<Logo />}>
      <LoginForm onSubmit={asyncNoop} />
    </LoginLayout>
  );
}
