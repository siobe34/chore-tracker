import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { type Column } from '@tanstack/react-table';
import {
  ArrowDownAZ,
  ArrowDownIcon,
  ArrowUpAZ,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff,
} from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-4 h-8 data-[state=open]:bg-accent'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='pl-2' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='pl-2' />
            ) : (
              <ChevronsUpDown className='pl-2' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpAZ className='pr-2 text-muted-foreground/70' /> Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownAZ className='pr-2 text-muted-foreground/70' /> Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className='pr-2 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
