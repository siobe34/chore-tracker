'use client';
import { Button } from '@/app/_components/ui/button';
import { DataTableToolbarFilter } from '@/app/_components/ui/data-table/data-table-toolbar-filter';
import { DataTableViewCols } from '@/app/_components/ui/data-table/data-table-view-cols';
import { Input } from '@/app/_components/ui/input';
import { Separator } from '@/app/_components/ui/separator';
import { statusOptions } from '@/lib/constants/tasks-table-status-col-options';
import { type TQueryUser } from '@/types/user';
import { type Table } from '@tanstack/react-table';
import { UserCircle2, X } from 'lucide-react';

interface TasksDataTableToolbarProps<TData> {
  table: Table<TData>;
  users: TQueryUser[];
}

export const TasksDataTableToolbar = <TData,>({
  table,
  users,
}: TasksDataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex flex-wrap items-center justify-between gap-2'>
      <Input
        className='h-full w-[150px] lg:w-[250px]'
        placeholder='Filter by description...'
        value={
          (table.getColumn('description')?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn('description')?.setFilterValue(event.target.value)
        }
      />
      <div className='flex items-center rounded-md border text-sm'>
        <span className='px-2'>Filter By</span>
        <Separator orientation='vertical' className='mx-2 h-4 w-[1px] border' />
        {table.getColumn('status') && (
          <DataTableToolbarFilter
            className='border-none'
            column={table.getColumn('status')}
            title='Status'
            options={statusOptions}
            showFilterSearch={false}
          />
        )}
        {table.getColumn('assignedTo') && (
          <DataTableToolbarFilter
            className='border-none'
            column={table.getColumn('assignedTo')}
            title='User'
            options={users.map((user) => ({
              value: user.name,
              label: user.name,
              icon: UserCircle2,
            }))}
            showFilterSearch={false}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X className='pl-2' />
          </Button>
        )}
      </div>
      <DataTableViewCols table={table} />
    </div>
  );
};
