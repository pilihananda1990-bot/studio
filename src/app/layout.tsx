import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/app/bottom-nav';
import { AppHeader } from '@/components/app/header';

export const metadata: Metadata = {
  title: 'EcoCollect',
  description: 'Recycle with Ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full bg-background flex flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
