
'use client';

import { ChangePasswordFlow } from '@/components/app/change-password-flow';

export default function ChangePasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-md mx-auto">
        <ChangePasswordFlow />
      </div>
    </div>
  );
}
