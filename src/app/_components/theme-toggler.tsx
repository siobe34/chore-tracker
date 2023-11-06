'use client';
import { MoonIcon } from '@/app/_components/moon-icon';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { MonitorSmartphone, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggler = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          className='relative flex items-center justify-center'
        >
          <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hover:stroke-secondary dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all hover:stroke-secondary dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => setTheme('light')}
        >
          <SunIcon className='pr-2' />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className='h-6 w-6 pr-2' />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => setTheme('system')}
        >
          <MonitorSmartphone className='pr-2' />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
