
import { AppHeader } from '@/components/app/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <div className="container mx-auto px-4 pt-4 md:px-6">
         <Button asChild variant="ghost">
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
