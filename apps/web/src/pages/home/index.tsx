import { Button } from '@expo-webview-kit/ui/Button';
import { toast } from 'sonner';

export function Home() {
  return (
    <>
      <Button
        size="icon"
        variant="destructive"
        className="rounded-full"
        onClick={() => {
          toast.success('This is a success toast');
          toast.warning('This is a success toast');
          toast.error('This is a success toast');
          toast.info('This is a success toast');
        }}
      >
        Toast message test
      </Button>
      <p>web environment {import.meta.env.VITE_ENV}</p>
    </>
  );
}
