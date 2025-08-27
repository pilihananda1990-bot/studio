

'use client';

import { ChangePasswordFlow } from '@/components/app/change-password-flow';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChangePasswordPage() {
  return (
    <div>
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon" className="-ml-2">
                        <Link href="/profile/security">
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Change Password</h1>
                </div>
            </div>
            <div className="max-w-md mx-auto">
                <ChangePasswordFlow />
            </div>
        </div>
    </div>
  );
}
