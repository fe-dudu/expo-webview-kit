import { dateFormat } from '@expo-webview-kit/utils/date/dateFormat';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

interface Props {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
  fullWidthButton?: boolean;
}

export function DateRangePicker({ value, onChange, fullWidthButton }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            fullWidthButton ? 'w-full' : 'w-[280px]',
            'justify-start text-left font-normal',
            !value?.from && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from && value.to && (
            <>
              {dateFormat(value.from)} → {dateFormat(value.to)}
            </>
          )}
          {value?.from && !value.to && dateFormat(value.from)}
          {!value?.from && <span>기간을 선택하세요.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
}
