import { MobileMenuButton } from '@/app/_components/mobile-menu-button';
import { ThemeToggler } from '@/app/_components/theme-toggler';
import { SITE_NAV_LINKS } from '@/lib/constants/navigation-links';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='relative z-50 flex items-center justify-between gap-8 bg-primary bg-gradient-to-b from-[hsl(300,85%,85%)] from-10% to-primary to-50% py-2 text-primary-foreground dark:from-[hsl(300,18%,38%)]'>
      <div className='pl-4'>
        <Link href={SITE_NAV_LINKS.home.path}>Chore Tracker</Link>
      </div>
      <MobileMenuButton className='peer mr-4 bg-transparent hover:bg-transparent sm:hidden' />
      <div
        className={cn(
          'bg-background text-foreground',
          'absolute top-full grid w-full',
          'grid-rows-[0fr] peer-[.active]:grid-rows-[1fr] peer-[.active]:border-b-2',
          'transition-[grid-template-rows] duration-300 ease-out',
          'sm:static sm:w-auto sm:grid-rows-1 sm:border-none sm:bg-transparent sm:pr-4 sm:text-inherit',
        )}
      >
        <div className='max-sm:overflow-hidden'>
          <ul className='flex flex-col sm:flex-row sm:gap-6'>
            {Object.values(SITE_NAV_LINKS).map(
              (route) =>
                route.display && (
                  <li
                    key={route.path}
                    className='flex flex-col items-center justify-center border-b py-2 text-center sm:border-none sm:p-0 sm:after:h-[1px] sm:after:w-0 sm:after:bg-primary-foreground sm:after:transition-all hover:sm:after:w-full'
                  >
                    <Link href={route.path}>{route.name}</Link>
                  </li>
                ),
            )}
            <li className='flex flex-col items-center justify-center border-b py-2 text-center sm:border-none sm:p-0'>
              <ThemeToggler />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
