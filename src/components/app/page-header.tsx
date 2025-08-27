
'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  backHref: string;
  backText: string;
};

export function PageHeader({ title, backHref, backText }: PageHeaderProps) {
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="w-1/3">
          <Button asChild variant="ghost" className="px-2 -ml-2">
            <Link href={backHref}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backText}
            </Link>
          </Button>
        </div>
        <div className="w-1/3 text-center">
            <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="w-1/3"></div>
      </div>
    </header>
  );
}
