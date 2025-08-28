
'use client';

import { PageHeader } from '@/components/app/page-header';
import { notifications } from '@/lib/data/notifications';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Notifications" />

      <main className="flex-1">
        {notifications.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p>You have no notifications.</p>
          </div>
        ) : (
          <ul className="divide-y">
            {notifications.map((notif) => (
              <li key={notif.id}>
                <Link
                  href={notif.href}
                  className="block p-4 hover:bg-muted/50"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                        notif.read ? 'bg-muted' : 'bg-primary'
                      )}
                    >
                      <notif.icon
                        className={cn(
                          'h-5 w-5',
                          notif.read
                            ? 'text-muted-foreground'
                            : 'text-primary-foreground'
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          'font-semibold',
                          notif.read ? 'text-muted-foreground' : ''
                        )}
                      >
                        {notif.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notif.description}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/80">
                        {formatDistanceToNow(new Date(notif.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
