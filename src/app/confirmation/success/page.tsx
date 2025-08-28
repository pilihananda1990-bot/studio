
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CompletionAnimation } from '@/components/app/completion-animation';

export default function ConfirmationSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000); // Redirect after 4 seconds to allow animation to play

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-4">
       <div className="text-center">
        <CompletionAnimation />
        <h1 className="mt-8 text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          Pickup Scheduled!
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Your request has been confirmed. The driver is on their way. You'll be redirected shortly.
        </p>
      </div>
    </div>
  );
}
