'use client';
import { Button } from '@/app/_components/ui/button';
import { ArrowUpCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToTop = () => {
  //* Intitialize whether or not to show the scroll to top button
  const [showToTop, setShowToTop] = useState(false);

  //* Add scroll event listener to determine the scroll position at the top of the page
  useEffect(() => {
    const showOnScroll = () => {
      //* If the scroll position is anywhere except at the top of the page then show the scroll button
      if (window.scrollY > 0) setShowToTop(true);
      //* Otherwise the scroll position is at the top of the page so no need to show the scroll button
      else setShowToTop(false);
    };

    window.addEventListener('scroll', showOnScroll);

    return () => {
      window.removeEventListener('scroll', showOnScroll);
    };
  }, []);

  //* Function to smoothly scroll to top of the page
  const smoothScrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showToTop && (
        <Button
          className='fixed bottom-8 right-8 z-30 inline-flex items-center justify-center bg-transparent text-foreground hover:bg-transparent'
          size='icon'
          onClick={() => smoothScrollToTop()}
        >
          <ArrowUpCircleIcon size={32} />
        </Button>
      )}
    </>
  );
};
