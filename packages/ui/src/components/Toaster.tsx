import { AlertTriangle, CircleCheck, Info, XCircle } from 'lucide-react';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      icons={{
        success: <CircleCheck className="text-green-500" />,
        warning: <AlertTriangle className="text-yellow-500" />,
        error: <XCircle className="text-red-500" />,
        info: <Info className="text-blue-500" />,
      }}
    />
  );
}
