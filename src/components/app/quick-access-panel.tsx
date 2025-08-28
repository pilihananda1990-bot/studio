
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
    <section className="mt-4">
      <div className="flex justify-between gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link href={feature.href} key={feature.label}>
              <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 text-center">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">{feature.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
