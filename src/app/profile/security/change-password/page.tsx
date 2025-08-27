
'use client';

import { ChangePasswordFlow } from '@/components/app/change-password-flow';

export default function ChangePasswordPage() {
  return (
    <div>
        {/* This page no longer needs a header, as it's handled inside the flow */}
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-md mx-auto">
                <ChangePasswordFlow />
            </div>
        </div>
    </div>
  );
}
