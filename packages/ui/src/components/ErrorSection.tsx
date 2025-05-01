import { Button } from '@expo-webview-kit/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@expo-webview-kit/ui/Card';
import { cn } from '@expo-webview-kit/ui/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import { RefreshCcw } from 'lucide-react';
import type { ComponentProps } from 'react';

const errorSectionVariants = cva('w-full h-full justify-center gap-3', {
  variants: {
    variant: {
      default: '',
      noneElevation: 'border-0 shadow-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface CardProps extends ComponentProps<typeof Card>, VariantProps<typeof errorSectionVariants> {
  title: string;
  description: string;
  buttonLabel: string;
  reset?: () => void;
}

export function ErrorSection({
  title,
  description,
  buttonLabel,
  reset = () => window.location.reload(),
  variant = 'default',
  className,
  ...props
}: CardProps) {
  return (
    <Card className={cn(errorSectionVariants({ variant }), className)} {...props}>
      <CardHeader className="flex justify-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardDescription className="flex justify-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-100" onClick={reset}>
          <RefreshCcw /> {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
