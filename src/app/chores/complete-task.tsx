'use client';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { useToast } from '@/app/_components/ui/use-toast';
import { api } from '@/trpc/react';
import { type TQueryTask } from '@/types/task';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const CompleteTask = ({ rowData }: { rowData: TQueryTask }) => {
  const router = useRouter();
  const { toast } = useToast();

  const updateTask = api.task.update.useMutation({
    onSuccess: () => {
      router.refresh();

      // * Display success notification
      toast({
        title: <CheckCircle2 />,
        description: 'Task successfully completed.',
        variant: 'success',
      });
    },
    onError: () => {
      router.refresh();

      // * Display fail notification
      toast({
        title: <AlertCircle />,
        description: 'Could not update the task. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleCheckboxEvent = () => {
    const isTaskComplete = rowData.status === 'COMPLETE';
    updateTask.mutate({
      ...rowData,
      status: isTaskComplete ? 'INPROGRESS' : 'COMPLETE',
    });
  };

  return (
    <Checkbox
      checked={rowData.status === 'COMPLETE'}
      onCheckedChange={handleCheckboxEvent}
    />
  );
};
