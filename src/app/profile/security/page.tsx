
'use client';

import { ChangePasswordFlow } from '@/components/app/change-password-flow';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
       <Button asChild variant="ghost" className="mb-4">
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
       </Button>
      <div className="grid gap-8 max-w-2xl mx-auto">
        <ChangePasswordFlow />
        
      </div>
    </div>
  );
}
