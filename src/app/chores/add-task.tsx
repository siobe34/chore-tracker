'use client';
import { Button } from '@/app/_components/ui/button';
import { DatePicker } from '@/app/_components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { useToast } from '@/app/_components/ui/use-toast';
import { DEFAULT_TASK } from '@/lib/constants/default-task';
import { readableStatusEnum } from '@/lib/mapStatusEnum';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { createTaskSchema, type TCreateUpdateTask } from '@/types/task';
import { type TQueryUser } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { parse } from 'date-fns';
import { AlertCircle, CheckCircle2, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRef, useState, type FormEvent } from 'react';

export const AddTask = ({
  className,
  users,
}: {
  className?: string;
  users: TQueryUser[];
}) => {
  const formId = 'create-task-form';

  const router = useRouter();
  const { toast } = useToast();

  const dialogCloseRef = createRef<HTMLButtonElement>();
  const datePickerRef = createRef<HTMLButtonElement>();

  const [task, setTask] = useState<Partial<TCreateUpdateTask>>(DEFAULT_TASK);

  const createTask = api.task.create.useMutation({
    onSuccess: (newTask) => {
      // * Programatically close the dialog/modal
      dialogCloseRef.current?.click();

      // * Refresh the current path and reset default state for task
      router.refresh();
      setTask(DEFAULT_TASK);

      // * Display success notification
      toast({
        title: <CheckCircle2 />,
        description: `Succesfully created new chore: ${newTask.description}`,
        variant: 'success',
      });
    },
    onError: () => {
      // * Display failure notification
      toast({
        title: <AlertCircle />,
        description: 'Could not create new chore. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // * Get date selected from date picker and return it to form handler
  const getCompleteByDate = () => {
    // * Grab datepicker element
    const dateAsString = datePickerRef.current?.textContent;
    if (!dateAsString) return new Date();

    // * Parse date as string to date object
    const completeBy = parse(dateAsString, 'PPP', new Date());

    return completeBy;
  };

  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();

    // * Get 'completeBy' date from datepicker element's text content
    const completeBy = getCompleteByDate();

    // * Parse the task state with zod
    const taskStateZod = createTaskSchema.safeParse({ ...task, completeBy });

    // * Display error messages if any
    if (taskStateZod.success === false) {
      taskStateZod.error.issues.forEach((error) =>
        toast({
          title: <AlertCircle />,
          description: error.message,
          variant: 'destructive',
        }),
      );
    }

    // * If the task state passes zod parsing, create the new task
    if (taskStateZod.success === true) {
      createTask.mutate(taskStateZod.data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(className)}>
          <PlusIcon className='pr-2' />
          Add Chore
        </Button>
      </DialogTrigger>
      <form id={formId} className='hidden' onSubmit={handleFormSubmission}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add a chore</DialogTitle>
            <DialogDescription>
              Fill in the fields below to add a new chore. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='description' className='sm:text-right'>
              Description
            </Label>
            <Input
              id='description'
              placeholder='Chore Description'
              defaultValue={task.description}
              onChange={(e) =>
                setTask((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              className='sm:col-span-3'
            />
          </div>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='user' className='sm:text-right'>
              User
            </Label>
            <Select
              required
              onValueChange={(value) =>
                setTask((prevState) => ({
                  ...prevState,
                  userId: Number(value),
                }))
              }
            >
              <SelectTrigger className='sm:col-span-3'>
                <SelectValue placeholder='Select User' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {users?.map((user) => (
                    <SelectItem
                      key={user.id}
                      className='cursor-pointer'
                      value={user.id.toString()}
                    >
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='status' className='sm:text-right'>
              Status
            </Label>
            <Select
              required
              defaultValue='NOTSTARTED'
              onValueChange={(value: TCreateUpdateTask['status']) =>
                setTask((prevState) => ({
                  ...prevState,
                  status: value,
                }))
              }
            >
              <SelectTrigger className='sm:col-span-3'>
                <SelectValue placeholder='Select Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(readableStatusEnum).map(
                    ([status, readableStatus]) => (
                      <SelectItem
                        key={status}
                        className='cursor-pointer'
                        value={status}
                      >
                        {readableStatus}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='complete-by' className='sm:text-right'>
              Complete By
            </Label>
            <DatePicker
              ref={datePickerRef}
              className='w-full overflow-hidden sm:col-span-3'
              defaultDate={task.completeBy ?? new Date()}
            />
          </div>
          <DialogFooter>
            <Button type='submit' form={formId} disabled={createTask.isLoading}>
              {createTask.isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
          <DialogClose ref={dialogCloseRef} className='hidden' />
        </DialogContent>
      </form>
    </Dialog>
  );
};
