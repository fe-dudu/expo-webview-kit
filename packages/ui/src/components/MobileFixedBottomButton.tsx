import type { VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Button, type buttonVariants } from './Button';

interface Props extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  containerClassName?: string;
}

export function MobileFixedBottomButton({ className, containerClassName, children, ...props }: Props) {
  return (
    <div className={cn('w-full flex justify-center fixed bottom-0 left-0 right-0 z-50', containerClassName)}>
      <div className="w-full max-w-[450px] bg-background border-t border-border">
        <div className="p-4">
          <Button className={cn('w-full', className)} {...props}>
            {children}
          </Button>
        </div>
      </div>
    </div>
  );
}
