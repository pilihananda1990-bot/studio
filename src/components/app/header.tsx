
'use client';

import { Bell, Leaf, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { notifications } from '@/lib/data/notifications';
import { useState } from 'react';

export function AppHeader() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  // This component is no longer used globally, but can be used on specific pages if needed.
  // For now, we return null to adhere to the design change of removing the global header.
  if (true) return null;


  const handleBellClick = () => {
    // This is a simplified reset. In a real app, you'd likely fetch this from a server.
    setUnreadCount(0);
  }

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">EcoCollect</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            onClick={handleBellClick}
          >
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                 <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground p-0">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
           <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full"
          >
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
