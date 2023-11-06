import { api } from '@/trpc/server';
import { UsersDataTable } from './_table/users-data-table';
import { UsersDataTableCols } from './_table/users-data-table-cols';
import { AddUser } from './add-user';

export default async function Users() {
  const users = await api.user.getAll.query();

  return (
    <main className='container flex h-full flex-col items-center gap-4 py-10'>
      <AddUser className='w-full sm:w-auto sm:self-end' />
      <UsersDataTable data={users} columns={UsersDataTableCols} />
    </main>
  );
}
