import { Button } from '@expo-webview-kit/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  title: React.ReactNode;
  onPrev?: () => void;
  showPrevButton?: boolean;
  className?: string;
}

export function Header({ title, onPrev, showPrevButton, className }: Props) {
  return (
    <div className={cn('px-4 flex align-center', className)}>
      {showPrevButton && (
        <Button variant="ghost" size="icon" className="-ml-4" onClick={onPrev}>
          <ChevronLeft className="size-7" />
        </Button>
      )}
      <h1 className="text-2xl font-bold text-gray-900 self-center truncate">{title}</h1>
    </div>
  );
}
