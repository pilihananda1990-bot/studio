
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CompletionAnimation } from '@/components/app/completion-animation';

export default function CompletionPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <CompletionAnimation />
        <h1 className="mt-8 text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          Pickup Scheduled!
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Thank you for recycling with EcoCollect! Your pickup is confirmed. You'll be redirected to the home screen shortly.
        </p>
      </div>
    </div>
  );
}
