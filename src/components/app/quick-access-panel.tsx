
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
      <div className="flex justify-start gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link href={feature.href} key={feature.label} className="flex-shrink-0">
              <div className="w-24 h-24 bg-card rounded-xl shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
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
