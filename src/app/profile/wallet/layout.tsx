

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/app/page-header';

export default function WalletPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader title="My Wallet" backHref="/profile" backText="Profile" />
      {children}
    </div>
  );
}
