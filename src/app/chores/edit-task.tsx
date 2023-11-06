'use client';
import { Button, type ButtonProps } from '@/app/_components/ui/button';
import { DatePicker } from '@/app/_components/ui/date-picker';
import {
  Dialog,
  DialogContent,
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
import { readableStatusEnum } from '@/lib/mapStatusEnum';
import { api } from '@/trpc/react';
import {
  updateTaskSchema,
  type TCreateUpdateTask,
  type TQueryTask,
} from '@/types/task';
import { DialogClose } from '@radix-ui/react-dialog';
import { parse } from 'date-fns';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRef, forwardRef, useState, type FormEvent } from 'react';

export const EditTask = forwardRef<
  HTMLButtonElement,
  ButtonProps & { data: TQueryTask }
>(({ data }, ref) => {
  const formId = `update-task-form__${data.id}`;

  const router = useRouter();
  const { toast } = useToast();

  const dialogCloseRef = createRef<HTMLButtonElement>();
  const datePickerRef = createRef<HTMLButtonElement>();

  const [task, setTask] = useState(data);

  const { data: users } = api.user.getAll.useQuery();

  const updateTask = api.task.update.useMutation({
    onSuccess: (updatedTask) => {
      // * Programatically close the dialog/modal
      dialogCloseRef.current?.click();

      // * Refresh the current path
      router.refresh();

      // * Reset the state for task
      setTask(updatedTask);

      // * Display success notification
      toast({
        title: <CheckCircle2 />,
        description: `Succesfully updated chore: ${updatedTask.description}`,
        variant: 'success',
      });
    },
    onError: () => {
      // * Display failure notification
      toast({
        title: <AlertCircle />,
        description: 'Could not update chore. Please try again.',
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
    const taskStateZod = updateTaskSchema.safeParse({ ...task, completeBy });

    // * Display error messages if any
    if (taskStateZod.success === false) {
      taskStateZod.error.issues.forEach((error) =>
        toast({
          title: <AlertCircle />,
          description: error.message,
          variant: 'destructive',
        })
      );
    }

    // * If the task state passes zod parsing, update the task
    if (taskStateZod.success === true) {
      updateTask.mutate(taskStateZod.data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={ref} className='hidden' />
      <form
        id={formId}
        className='grid gap-4 py-4'
        onSubmit={handleFormSubmission}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit chore</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='description' className='sm:text-right'>
              Description
            </Label>
            <Input
              id='description'
              required
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
              defaultValue={task.userId.toString()}
              onValueChange={(value) =>
                setTask((prevState) => ({
                  ...prevState,
                  userId: Number(value),
                }))
              }
            >
              <SelectTrigger className='sm:col-span-3'>
                <SelectValue placeholder={task.assignedTo} />
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
              defaultValue={task.status}
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
                    )
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
            <Button type='submit' form={formId} disabled={updateTask.isLoading}>
              {updateTask.isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
          <DialogClose ref={dialogCloseRef} className='hidden' />
        </DialogContent>
      </form>
    </Dialog>
  );
});
EditTask.displayName = 'EditTask';
