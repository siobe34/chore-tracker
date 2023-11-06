import { api } from '@/trpc/server';
import { UsersDataTable } from './_table/users-data-table';
import { UsersDataTableCols } from './_table/users-data-table-cols';

export default async function Users() {
  const users = await api.user.getAll.query();

  return (
    <main className='container flex h-full flex-col items-center gap-4 py-10'>
      <UsersDataTable data={users} columns={UsersDataTableCols} />
    </main>
  );
}
