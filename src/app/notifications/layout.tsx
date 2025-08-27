

import { PageHeader } from '@/components/app/page-header';

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader title="Notifications" backHref="/" backText="Home" />
      {children}
    </div>
  );
}
