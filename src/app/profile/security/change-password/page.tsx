

'use client';

import { ChangePasswordFlow } from '@/components/app/change-password-flow';
import { PageHeader } from '@/components/app/page-header';

export default function ChangePasswordPage() {
  return (
    <div>
        <PageHeader title="Change Password" backHref="/profile/security" />
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-md mx-auto">
                <ChangePasswordFlow />
            </div>
        </div>
    </div>
  );
}
