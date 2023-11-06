import { Header } from '@/app/_components/header';
import { ScrollToTop } from '@/app/_components/scroll-to-top';
import { Toaster } from '@/app/_components/ui/toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { TRPCReactProvider } from '@/trpc/react';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { ThemeProvider } from './_components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Chore Tracker | KJIR',
  description: 'Manage chores within your home.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'grid min-h-screen grid-cols-1 grid-rows-[6rem_1fr] gap-4 bg-background font-sans text-foreground',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
