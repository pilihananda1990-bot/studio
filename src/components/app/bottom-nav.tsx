
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, User, Map } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Maps', icon: Map },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background z-20 border-t">
      <div className="container mx-auto h-full px-6">
        <div className="flex justify-around items-center h-full">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link href={href} key={label} className="flex-1">
                <div
                  className={cn(
                    'flex flex-col items-center gap-1 transition-colors',
                    isActive ? 'text-primary' : 'text-gray-400'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
