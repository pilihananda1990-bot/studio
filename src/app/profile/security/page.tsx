
'use client';

import {
  ChevronRight,
  KeyRound,
  ListCollapse,
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/app/page-header';

const securityItems = [
  {
    icon: KeyRound,
    label: 'Change Password',
    description: 'Update your password for enhanced security',
    href: '/profile/security/change-password',
  },
  {
    icon: ListCollapse,
    label: 'Account Activity',
    description: 'See recent login history and active sessions',
    href: '/profile/security/account-activity',
  },
];

export default function SecurityPage() {
  return (
    <div>
      <PageHeader title="Security Settings" backHref="/profile" backText="Profile" />
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <p className="text-muted-foreground mt-1">
          Manage your account's security settings and view recent activity.
        </p>

        <Separator className="my-8" />
        
        <div className="space-y-2">
            {securityItems.map((item, index) => (
            <div key={item.label}>
                <Link
                href={item.href}
                className="flex items-center justify-between p-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                <div className="flex items-center gap-4">
                    <item.icon className="h-6 w-6 text-muted-foreground" />
                    <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.description}</span>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
                {index < securityItems.length - 1 && <Separator />}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
