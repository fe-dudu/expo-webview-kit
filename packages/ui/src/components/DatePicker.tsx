import { dateFormat } from '@expo-webview-kit/utils/date';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

interface Props {
  value?: Date;
  onChange: (date?: Date) => void;
  buttonWidth?: number;
  fullWidthButton?: boolean;
}

export function DatePicker({ value, onChange, fullWidthButton }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            fullWidthButton ? 'w-full' : 'w-[170px]',
            'justify-start text-left font-normal',
            !value && 'text-foreground',
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? dateFormat(value) : <span>Select a date.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar initialFocus mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
