
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/app/bottom-nav';
import { ThemeProvider } from '@/components/app/theme-provider';
import { PickupProvider } from '@/context/pickup-context';

export const metadata: Metadata = {
  title: 'EcoCollect',
  description: 'Find your new best friend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
       <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="font-body antialiased h-full bg-background flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <PickupProvider>
            <main className="flex-1 overflow-y-auto pb-24">{children}</main>
            <BottomNav />
            <Toaster />
          </PickupProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
