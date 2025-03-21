import { useOnline } from '@expo-webview-kit/utils/hooks/useOnline';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function OfflineToastNotifier() {
  const isOnline = useOnline();

  useEffect(() => {
    if (!isOnline) {
      toast.error('Network connection lost.', {
        description: 'Please check your network and reconnect.',
      });
    }
  }, [isOnline]);

  return null;
}
