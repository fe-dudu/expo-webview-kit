import { RefreshTokenPromiseInjector } from '@expo-webview-kit/api/RefreshTokenPromiseInjector';
import { TanstackQueryProvider } from '@expo-webview-kit/tanstack-query';
import { OfflineToastNotifier } from '@expo-webview-kit/ui/OfflineToastNotifier';
import { Toaster } from '@expo-webview-kit/ui/Toaster';
import { TokenManager } from '@expo-webview-kit/utils/auth/TokenManager';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { Routes } from './pages/Route';

import '@expo-webview-kit/api/global.d.ts';
import '@expo-webview-kit/ui/globals.css';
import 'jotai-devtools/styles.css';

export function App() {
  return (
    <>
      <TokenManager />
      <RefreshTokenPromiseInjector />
      <Toaster />
      <OfflineToastNotifier />
      <JotaiDevTools position="top-right" />
      <TanstackQueryProvider>
        <Routes />
      </TanstackQueryProvider>
    </>
  );
}
