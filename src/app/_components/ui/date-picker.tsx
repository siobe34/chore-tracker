'use client';
import { Button, type ButtonProps } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover';
import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

type DatePickerProps = ButtonProps & { defaultDate: Date };

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, defaultDate }, ref) => {
    const [date, setDate] = useState<Date | undefined>(defaultDate);

    const handleDateSelection = (selectedDate?: Date) => {
      setDate(selectedDate);

      // * Programatically close popover when a date is selected
      const closePopoverEl = document.getElementById('close-date-picker');
      closePopoverEl?.click();
    };
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <PopoverClose id='close-date-picker' className='hidden' />
          <Calendar
            initialFocus
            mode='single'
            selected={date}
            onSelect={(selectedDate) => handleDateSelection(selectedDate)}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };
