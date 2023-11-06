'use client';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { useToast } from '@/app/_components/ui/use-toast';
import { api } from '@/trpc/react';
import { type TQueryUser } from '@/types/user';
import {
  BookOpenText,
  CheckCircle2,
  Edit,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRef } from 'react';
import { EditUser } from '../edit-user';
import { ViewUser } from '../view-user';

export const UsersDataTableActions = ({ rowData }: { rowData: TQueryUser }) => {
  const router = useRouter();
  const { toast } = useToast();

  const editUserDialogRef = createRef<HTMLButtonElement>();
  const viewUserDialogRef = createRef<HTMLButtonElement>();

  const deleteUser = api.user.delete.useMutation({
    onSuccess: (data) => {
      router.refresh();

      // * Display success notification
      toast({
        title: <CheckCircle2 />,
        description: data.message,
        variant:
          data.code === 200
            ? 'success'
            : data.code === 500
            ? 'destructive'
            : 'default',
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open row actions menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => viewUserDialogRef.current?.click()}
          >
            <BookOpenText className='pr-2' /> View details
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => editUserDialogRef.current?.click()}
          >
            <Edit className='pr-2' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer bg-destructive text-destructive-foreground focus:bg-destructive/80 focus:text-destructive-foreground/80'
            onClick={() => deleteUser.mutate({ id: rowData.id })}
          >
            <Trash2 className='pr-2' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUser ref={editUserDialogRef} data={rowData} />
      <ViewUser ref={viewUserDialogRef} data={rowData} />
    </>
  );
};
