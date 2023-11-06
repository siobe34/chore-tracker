'use client';
import { Button } from '@/app/_components/ui/button';
import { cn } from '@/lib/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type MobileMenuButtonProps = {
  className?: string;
};

export const MobileMenuButton = ({ className }: MobileMenuButtonProps) => {
  const route = usePathname();

  const toggleMobileMenu = () => {
    const btnEl = document.getElementById('mobile-menu-button');
    btnEl?.classList.toggle('active');
  };

  useEffect(() => {
    const btnEl = document.getElementById('mobile-menu-button');
    btnEl?.classList.remove('active');
  }, [route]);

  return (
    <Button
      id='mobile-menu-button'
      size='icon'
      className={cn('group', className)}
      onClick={toggleMobileMenu}
    >
      <MenuIcon className='rotate-0 scale-100 transition-all group-[.active]:-rotate-90 group-[.active]:scale-0' />
      <XIcon className='absolute rotate-90 scale-0 transition-all group-[.active]:rotate-0 group-[.active]:scale-100' />
      <span className='sr-only'>Toggle menu for site links</span>
    </Button>
  );
};
