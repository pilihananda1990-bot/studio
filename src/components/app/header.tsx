
'use client';

import { Bell, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { notifications } from '@/lib/data';
import { useState } from 'react';

export function AppHeader() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  if (pathname === '/map' || pathname.startsWith('/notifications')) {
    return null;
  }
  
  const handleBellClick = () => {
    // This is a simplified reset. In a real app, you'd likely fetch this from a server.
    setUnreadCount(0);
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-tight">EcoCollect</h1>
        </Link>
        <div className="flex items-center gap-4">
          <p className="hidden text-sm md:block">Hello, Eco-Warrior!</p>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-primary/80 focus-visible:bg-primary/80"
            onClick={handleBellClick}
          >
            <Link href="/notifications">
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                 <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground p-0">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
