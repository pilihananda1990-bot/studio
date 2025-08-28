
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: '/icons/home.svg' },
  { href: '/chat', label: 'Chat', icon: '/icons/chat.svg' },
  { href: '/favorite', label: 'Favorite', icon: '/icons/favorite.svg' },
  { href: '/scan', label: 'Scan', icon: '/icons/scan.svg' },
  { href: '/profile', label: 'Profile', icon: '/icons/paw.svg' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background z-20">
      <div className="container mx-auto h-full px-6">
        <div className="relative flex justify-around items-center h-full bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
          {navItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link href={href} key={label} className="flex-1">
                <div
                  className={cn(
                    'flex flex-col items-center gap-1 transition-colors',
                    isActive ? 'text-primary' : 'text-gray-400'
                  )}
                >
                  <Image src={icon} alt={label} width={24} height={24} className={cn(!isActive && 'grayscale opacity-50')} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
