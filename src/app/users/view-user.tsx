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
import { type TQueryUser } from '@/types/user';
import { format } from 'date-fns';
import { forwardRef } from 'react';

export const ViewUser = forwardRef<
  HTMLButtonElement,
  ButtonProps & { data: TQueryUser }
>(({ data }, ref) => {
  return (
    <Dialog>
      <DialogTrigger ref={ref} className='hidden' />
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
          <Label
            htmlFor='description'
            className='pb-1 leading-relaxed sm:pb-0 sm:text-right'
          >
            Name
          </Label>
          <span
            id='name'
            className='rounded-md border px-3 py-2 text-sm sm:col-span-3'
          >
            {data.name}
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

ViewUser.displayName = 'ViewUser';
