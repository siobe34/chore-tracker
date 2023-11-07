import { api } from '@/trpc/server';
import { TasksDataTable } from './_table/tasks-data-table';
import { TasksDataTableCols } from './_table/tasks-data-table-cols';
import { AddTask } from './add-task';

export default async function Chores() {
  const users = await api.user.getAll.query();
  const tasks = await api.task.getByStatus.query({
    status: ['NOTSTARTED', 'INPROGRESS'],
  });

  return (
    <main className='container flex h-full flex-col items-center gap-4 py-10'>
      <AddTask className='w-full sm:w-auto sm:self-end' users={users} />
      <TasksDataTable columns={TasksDataTableCols} data={tasks} users={users} />
    </main>
  );
}
