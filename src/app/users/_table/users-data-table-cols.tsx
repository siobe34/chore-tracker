'use client';
import { DataTableColumnHeader } from '@/app/_components/ui/data-table/data-table-column-header';
import { type TQueryUser } from '@/types/user';
import { type ColumnDef } from '@tanstack/react-table';
import { UsersDataTableActions } from './users-data-table-actions';

export const UsersDataTableCols: ColumnDef<TQueryUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <UsersDataTableActions rowData={row.original} />,
  },
];
