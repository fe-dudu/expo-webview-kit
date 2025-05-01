import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
  icon?: React.ReactNode;
}

function Select({ className, containerClassName, children, icon, ...props }: SelectProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <select
        className={cn(
          "border-input bg-background ring-offset-background focus-visible:ring-ring data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 w-full appearance-none rounded-md border px-3 py-2 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        {icon || <ChevronDown className="size-4 opacity-50" />}
      </div>
    </div>
  );
}

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

function SelectOption({ className, ...props }: OptionProps) {
  return <option className={className} {...props} />;
}

export interface OptGroupProps extends React.OptgroupHTMLAttributes<HTMLOptGroupElement> {}

function SelectOptionGroup({ className, ...props }: OptGroupProps) {
  return <optgroup className={cn('font-medium', className)} {...props} />;
}

export { Select, SelectOption, SelectOptionGroup };
