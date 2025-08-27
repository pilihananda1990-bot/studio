
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Laptop, Smartphone, Monitor } from 'lucide-react';

const activityLogs = [
  {
    device: 'iPhone 15 Pro',
    icon: Smartphone,
    location: 'Tasikmalaya, Indonesia',
    time: '2 minutes ago',
    isCurrent: true,
  },
  {
    device: 'Macbook Pro 16"',
    icon: Laptop,
    location: 'Bandung, Indonesia',
    time: 'Yesterday, 10:30 AM',
    isCurrent: false,
  },
  {
    device: 'Windows PC',
    icon: Monitor,
    location: 'Jakarta, Indonesia',
    time: 'May 20, 2024, 08:15 PM',
    isCurrent: false,
  },
];

export default function AccountActivityPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
       <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Account Activity</CardTitle>
                <CardDescription>
                Review recent login activity and active sessions on your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                {activityLogs.map((log, index) => (
                    <div key={index}>
                    <div className="flex items-start gap-4">
                        <log.icon className="h-8 w-8 text-muted-foreground mt-1" />
                        <div className="flex-grow">
                        <p className="font-semibold">{log.device}</p>
                        <p className="text-sm text-muted-foreground">{log.location}</p>
                        <p className="text-sm text-muted-foreground">{log.time}</p>
                        </div>
                        {log.isCurrent && (
                        <div className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-400 px-2 py-1 rounded-md">
                            Current Session
                        </div>
                        )}
                    </div>
                    {index < activityLogs.length - 1 && <Separator className="mt-4" />}
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
