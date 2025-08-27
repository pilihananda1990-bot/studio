
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notifications as initialNotifications } from '@/lib/data/notifications';
import type { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-6">
         <h1 className="text-2xl font-bold">Notifications</h1>
         <Button variant="link" onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Link href={notification.href} key={notification.id} onClick={() => markAsRead(notification.id)}>
              <Card className={cn('hover:shadow-md transition-shadow', !notification.read && 'bg-primary/5 border-primary/20')}>
                <CardContent className="p-4 flex items-start gap-4">
                   {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                  )}
                  <div className={cn("rounded-full p-2", !notification.read ? 'bg-primary/10' : 'bg-muted')}>
                     <notification.icon className={cn("h-6 w-6", !notification.read ? 'text-primary' : 'text-muted-foreground')} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                     <p className="text-xs text-muted-foreground mt-2">
                       {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">You have no notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
