import { Header } from '@/app/_components/header';
import { ScrollToTop } from '@/app/_components/scroll-to-top';
import { Toaster } from '@/app/_components/ui/toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { TRPCReactProvider } from '@/trpc/react';
import { type Metadata } from 'next';
import { Maven_Pro } from 'next/font/google';
import { headers } from 'next/headers';
import { ThemeProvider } from './_components/theme-provider';

const mavenPro = Maven_Pro({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Chore Tracker | KJIR',
  description: 'Manage chores within your home.',
  manifest: '/site.webmanifest',
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
          mavenPro.variable
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
