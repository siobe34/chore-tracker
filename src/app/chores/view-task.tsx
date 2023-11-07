'use client';
import { type ButtonProps } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { Label } from '@/app/_components/ui/label';
import { readableStatusEnum } from '@/lib/mapStatusEnum';
import { type TQueryTask } from '@/types/task';
import { format } from 'date-fns';
import { forwardRef } from 'react';

export const ViewTask = forwardRef<
  HTMLButtonElement,
  ButtonProps & { data: TQueryTask }
>(({ data }, ref) => {
  return (
    <Dialog>
      <DialogTrigger ref={ref} className='hidden' />
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Chore details</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='description'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            Description
          </Label>
          <span
            id='description'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {data.description}
          </span>
        </div>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='status'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            Status
          </Label>
          <span
            id='status'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {readableStatusEnum[data.status]}
          </span>
        </div>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='user'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            User
          </Label>
          <span
            id='user'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {data.assignedTo}
          </span>
        </div>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='complete-by'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            Complete By
          </Label>
          <span
            id='complete-by'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {format(data.completeBy, 'PP')}
          </span>
        </div>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='created-at'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            Created
          </Label>
          <span
            id='created-at'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {format(data.createdAt, 'PP')}
          </span>
        </div>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='updated-at'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            Last Modified
          </Label>
          <span
            id='updated-at'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {format(data.updatedAt, 'PP')}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ViewTask.displayName = 'ViewTask';
