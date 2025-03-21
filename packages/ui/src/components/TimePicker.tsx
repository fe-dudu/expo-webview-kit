import { dateFormat } from '@expo-webview-kit/utils/date/dateFormat';
import { range } from '@expo-webview-kit/utils/range';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

type Period = 'AM' | 'PM';

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  fullWidthButton?: boolean;
  className?: string;
}

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

  const handleHourChange = (value: string) => {
    const hour = Number(value);
    setSelectedHour(hour);
    updateDate(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteChange = (value: string) => {
    const minute = Number(value);
    setSelectedMinute(minute);
    updateDate(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value as Period);
    updateDate(selectedHour, selectedMinute, value as Period);
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
          {value ? dateFormat(value, 'a h시 m분') : <span>시간 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex gap-2 items-end">
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="오전/오후" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">오전</SelectItem>
              <SelectItem value="PM">오후</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedHour.toString()} onValueChange={handleHourChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="시" />
            </SelectTrigger>
            <SelectContent>
              {range(1, 13).map((hour) => {
                return (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour}시
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select value={selectedMinute.toString()} onValueChange={handleMinuteChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="분" />
            </SelectTrigger>
            <SelectContent>
              {range(0, 60).map((minute) => (
                <SelectItem key={minute} value={minute.toString()}>
                  {minute}분
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
