import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={`stepper-${step}`} className="flex flex-col items-center relative flex-1">
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-1/2 left-1/2 -translate-y-3.5 h-1 w-full',
                    isCompleted && !isCurrent ? 'bg-primary' : 'bg-gray-300',
                  )}
                />
              )}

              <div
                className={cn(
                  'size-6 relative z-10 flex items-center justify-center rounded-full',
                  isCompleted ? 'bg-primary' : '',
                )}
              >
                {isCompleted ? (
                  <Check className="size-5 text-white" />
                ) : (
                  <div className="size-3.5 bg-gray-300 rounded-full" />
                )}
              </div>

              <div className={cn('mt-2 text-xs font-medium', isCompleted ? 'text-black' : 'text-primary-foreground')}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
