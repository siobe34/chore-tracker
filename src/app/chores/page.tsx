import { api } from '@/trpc/server';

export default async function Chores() {
  const users = await api.user.getAll.query();
  const tasks = await api.task.getAll.query();

  return (
    <main className='container flex h-full flex-col items-center gap-4 py-10'>
    </main>
  );
}
