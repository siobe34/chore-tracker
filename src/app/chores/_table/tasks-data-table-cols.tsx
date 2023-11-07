'use client';
import { DataTableColumnHeader } from '@/app/_components/ui/data-table/data-table-column-header';
import { readableStatusEnum } from '@/lib/mapStatusEnum';
import { type TQueryTask } from '@/types/task';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CompleteTask } from '../complete-task';
import { TasksDataTableActions } from './tasks-data-table-actions';

export const TasksDataTableCols: ColumnDef<TQueryTask>[] = [
  {
    id: 'markComplete',
    cell: ({ row }) => <CompleteTask rowData={row.original} />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => readableStatusEnum[row.original.status],
    filterFn: (row, id, valueAsAny) => {
      const value = valueAsAny as string[];
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'assignedTo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    filterFn: (row, id, valueAsAny) => {
      const value = valueAsAny as string[];
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'completeBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Complete By' />
    ),
    cell: ({ row }) => format(row.original.completeBy, 'PP'),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <TasksDataTableActions rowData={row.original} />,
  },
];
