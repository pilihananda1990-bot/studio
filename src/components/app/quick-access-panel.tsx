
'use client';

import { Trophy, Newspaper, Gift, Calendar } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: Trophy, label: 'Leaderboard', href: '#' },
  { icon: Newspaper, label: 'Article', href: '#' },
  { icon: Gift, label: 'Rewards', href: '#' },
  { icon: Calendar, label: 'Events', href: '#' },
];

export function QuickAccessPanel() {
  return (
    <section className="mt-8">
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link href={feature.href} key={feature.label}>
              <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-24 text-center">
                <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">{feature.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
