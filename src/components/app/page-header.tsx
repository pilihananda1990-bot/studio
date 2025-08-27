

'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  backHref: string;
};

export function PageHeader({ title, backHref }: PageHeaderProps) {
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="-ml-2">
                <Link href={backHref}>
                <ArrowLeft />
                <span className="sr-only">Back</span>
                </Link>
            </Button>
            <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>
      </div>
    </header>
  );
}
