import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useSwipeable } from 'react-swipeable';
import { cn } from '../utils/cn';
import { buttonVariants } from './Button';

export function Calendar({
  className,
  classNames,
  disabled = (date) => date > new Date('2100-01-01') || date < new Date('1900-01-01'),
  showOutsideDays = true,
  showCaption = true,
  ...props
}: React.ComponentProps<typeof DayPicker> & { showCaption?: boolean }) {
  const [currentMonth, setCurrentMonth] = useState<Date>(props.defaultMonth || new Date());

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    setCurrentMonth(prevMonth);
    props.onMonthChange?.(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
    props.onMonthChange?.(nextMonth);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    props.onMonthChange?.(date);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextMonth(),
    onSwipedRight: () => handlePrevMonth(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 50,
  });

  return (
    <div {...swipeHandlers} className={cn('w-full select-none touch-pan-y', className)}>
      <DayPicker
        fixedWeeks
        locale={ko}
        disabled={disabled}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        showOutsideDays={showOutsideDays}
        formatters={{ formatCaption: (month) => format(month, 'yyyy M') }}
        className={className}
        classNames={{
          months: 'flex w-full flex-col sm:flex-row gap-2',
          month: 'flex flex-col gap-4',
          caption: `flex justify-center pt-1 relative mx-2.5 items-center ${showCaption ? '' : 'hidden'}`,
          caption_label: 'text-sm font-semibold',
          caption_end: 'w-full',
          nav: 'flex items-center gap-1',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-full min-h-10 bg-transparent p-0 opacity-50 hover:opacity-100',
          ),
          nav_button_previous: 'absolute left-0',
          nav_button_next: 'absolute right-0',
          table: 'w-full border-collapse space-x-1',
          tbody: 'w-full',
          head_row: 'flex',
          head_cell: 'text-muted-foreground rounded-md w-full min-h-5 font-normal text-sm',
          row: 'flex w-full mt-2',
          cell: cn(
            'w-full h-full min-h-10 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
            props.mode === 'range'
              ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
              : '[&:has([aria-selected])]:rounded-md',
          ),
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full h-full min-h-10 p-0 font-normal aria-selected:opacity-100',
          ),
          day_range_start: 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
          day_range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => <ChevronLeft className={className} {...props} />,
          IconRight: ({ className, ...props }) => <ChevronRight className={className} {...props} />,
        }}
        {...props}
      />
    </div>
  );
}
