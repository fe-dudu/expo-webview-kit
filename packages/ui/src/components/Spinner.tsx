import { LoaderCircle } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export function Spinner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full h-full flex justify-center items-center', className)} {...props}>
      <LoaderCircle className="animate-spin text-primary" size={40} />
    </div>
  );
}
