'use client';
import { Button } from '@/app/_components/ui/button';
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
import { useToast } from '@/app/_components/ui/use-toast';
import { DEFAULT_USER } from '@/lib/constants/default-user';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { createUserSchema, type TCreateUpdateUser } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { AlertCircle, CheckCircle2, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRef, useState, type FormEvent } from 'react';

export const AddUser = ({ className }: { className?: string }) => {
  const formId = 'create-user-form';

  const router = useRouter();
  const { toast } = useToast();

  const dialogCloseRef = createRef<HTMLButtonElement>();

  const [user, setUser] = useState<Partial<TCreateUpdateUser>>({
    name: undefined,
  });

  const createUser = api.user.create.useMutation({
    onSuccess: (newUser) => {
      // * Programatically close the dialog/modal
      dialogCloseRef.current?.click();

      // * Refresh the current path and reset default state
      router.refresh();
      setUser(DEFAULT_USER);

      // * Display success notification
      toast({
        title: <CheckCircle2 />,
        description: `Succesfully created new user: ${newUser.name}`,
        variant: 'success',
      });
    },
    onError: () => {
      // * Display failure notification
      toast({
        title: <AlertCircle />,
        description: 'Could not create new user. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();

    // * Parse the user state with zod
    const userStateZod = createUserSchema.safeParse(user);

    // * Display error messages if any
    if (userStateZod.success === false) {
      userStateZod.error.issues.forEach((error) =>
        toast({
          title: <AlertCircle />,
          description: error.message,
          variant: 'destructive',
        })
      );
    }

    // * If the task state passes zod parsing, create the new task
    if (userStateZod.success === true) {
      createUser.mutate(userStateZod.data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(className)}>
          <PlusIcon className='pr-2' />
          Add User
        </Button>
      </DialogTrigger>
      <form id={formId} className='hidden' onSubmit={handleFormSubmission}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add a user</DialogTitle>
            <DialogDescription>
              Fill in the new user&apos;s name below. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4'>
            <Label htmlFor='name' className='sm:text-right'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='Name'
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
            <Button type='submit' form={formId} disabled={createUser.isLoading}>
              {createUser.isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
          <DialogClose ref={dialogCloseRef} className='hidden' />
        </DialogContent>
      </form>
    </Dialog>
  );
};
