'use client';
import { Button, type ButtonProps } from '@/app/_components/ui/button';
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
import { useToast } from '@/app/_components/ui/use-toast';
import { api } from '@/trpc/react';
import { updateUserSchema, type TQueryUser } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRef, forwardRef, useState, type FormEvent } from 'react';

export const EditUser = forwardRef<
  HTMLButtonElement,
  ButtonProps & { data: TQueryUser }
>(({ data }, ref) => {
  const formId = `update-user-form__${data.id}`;

  const router = useRouter();
  const { toast } = useToast();

  const dialogCloseRef = createRef<HTMLButtonElement>();

  const [user, setUser] = useState(data);

  const updateUser = api.user.update.useMutation({
    onSuccess: (updatedTask) => {
      // * Programatically close the dialog/modal
      dialogCloseRef.current?.click();

      // * Refresh the current path
      router.refresh();

      // * Reset the state for task
      setUser(updatedTask);

      // * Display success notification
      toast({
        title: <CheckCircle2 />,
        description: `Succesfully updated user: ${updatedTask.name}`,
        variant: 'success',
      });
    },
    onError: () => {
      // * Display failure notification
      toast({
        title: <AlertCircle />,
        description: 'Could not update User. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();

    // * Parse the user state with zod
    const userStateZod = updateUserSchema.safeParse(user);

    // * Display error messages if any
    if (userStateZod.success === false) {
      userStateZod.error.issues.forEach((error) =>
        toast({
          title: <AlertCircle />,
          description: error.message,
          variant: 'destructive',
        }),
      );
    }

    // * If the user state passes zod parsing, update the User in db
    if (userStateZod.success === true) {
      updateUser.mutate(userStateZod.data);
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
            <DialogTitle>Edit user</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='name' className='sm:text-right'>
              Name
            </Label>
            <Input
              id='name'
              required
              defaultValue={user.name}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              className='sm:col-span-3'
            />
          </div>
          <DialogFooter>
            <Button type='submit' form={formId} disabled={updateUser.isLoading}>
              {updateUser.isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
          <DialogClose ref={dialogCloseRef} className='hidden' />
        </DialogContent>
      </form>
    </Dialog>
  );
});
EditUser.displayName = 'EditUser';
