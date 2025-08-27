
'use client';
import { ProfileView } from '@/components/app/profile-view';
import { usePathname } from 'next/navigation';
import { AppHeader } from '@/components/app/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const pathname = usePathname();
  const isSubPage = pathname !== '/profile';

  return (
    <>
      {!isSubPage && <AppHeader />}
      {isSubPage && (
        <div className="container mx-auto px-4 pt-4 md:px-6">
          <Button asChild variant="ghost">
            <Link href="/profile">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
        </div>
      )}
      <ProfileView />
    </>
  );
}
