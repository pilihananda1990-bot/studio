
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Maps', icon: Map },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  // The navigation should be hidden on sub-routes of the main sections for a cleaner UX
  const isSubRoute = navItems.some(item => item.href !== '/' && pathname.startsWith(item.href) && pathname !== item.href);
  const isHome = pathname === '/';

  // Determine if the path is a main navigation path
  const isMainPath = navItems.some(item => item.href === pathname);
  
  // Hide on all sub-routes except for the root home page
  if (!isMainPath) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-20 md:hidden">
      <div className="container mx-auto h-full">
        <div className="flex justify-around items-center h-full">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link href={href} key={label}>
                <div
                  className={cn(
                    'flex flex-col items-center gap-1 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
