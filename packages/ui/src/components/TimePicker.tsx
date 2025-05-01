import { dateFormat } from '@expo-webview-kit/utils/date';
import { range } from '@expo-webview-kit/utils/range';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Select, SelectOption } from './Select';

type Period = 'AM' | 'PM';

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  fullWidthButton?: boolean;
  className?: string;
}

const HOUR_RANGE = range(1, 13);
const MINUTE_RANGE = [0, 15, 30, 45] as const;

export function TimePicker({ value, onChange, fullWidthButton, className }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState<number>(value.getHours() % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState<number>(value.getMinutes());
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(value.getHours() >= 12 ? 'PM' : 'AM');

  const updateDate = (hour: number, minute: number, period: Period) => {
    const newDate = new Date(value);
    let hours = hour;

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }

    if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    newDate.setHours(hours);
    newDate.setMinutes(minute);
    onChange(newDate);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = Number(e.target.value);
    setSelectedHour(hour);
    updateDate(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minute = Number(e.target.value);
    setSelectedMinute(minute);
    updateDate(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value as Period);
    updateDate(selectedHour, selectedMinute, e.target.value as Period);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            fullWidthButton ? 'w-full' : 'w-[170px]',
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? dateFormat(value, 'a h m') : <span>Select a time.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex gap-2 items-end">
          <Select value={selectedPeriod} onChange={handlePeriodChange}>
            <SelectOption value="AM">AM</SelectOption>
            <SelectOption value="PM">PM</SelectOption>
          </Select>
          <Select value={selectedHour.toString()} onChange={handleHourChange}>
            {HOUR_RANGE.map((hour) => {
              return (
                <SelectOption key={hour} value={hour.toString()}>
                  {hour}
                </SelectOption>
              );
            })}
          </Select>
          <Select value={selectedMinute.toString()} onChange={handleMinuteChange}>
            {MINUTE_RANGE.map((minute) => (
              <SelectOption key={minute} value={minute.toString()}>
                {minute}
              </SelectOption>
            ))}
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
