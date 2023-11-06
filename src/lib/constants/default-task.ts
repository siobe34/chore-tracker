import { type TCreateUpdateTask } from '@/types/task';
import { addDays } from 'date-fns';

export const DEFAULT_TASK: Partial<TCreateUpdateTask> = {
  description: undefined,
  status: 'NOTSTARTED',
  userId: undefined,
  completeBy: addDays(Date.now(), 14),
};
