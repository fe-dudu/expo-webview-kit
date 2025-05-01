import { cn } from '../utils/cn';

export function Textarea({ className, value, maxLength, ...props }: React.ComponentProps<'textarea'>) {
  const isOverLimit = maxLength && typeof value === 'string' ? value.length > maxLength : false;

  return (
    <div className="space-y-1">
      <textarea
        data-slot="textarea"
        value={value}
        maxLength={maxLength}
        className={cn(
          'resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        aria-invalid={isOverLimit}
        {...props}
      />
      {maxLength && typeof value === 'string' && (
        <div className="text-xs text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
