
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CompletionAnimation } from '@/components/app/completion-animation';

export default function RedeemSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/profile/wallet');
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <CompletionAnimation />
        <h1 className="mt-8 text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          Redemption Successful!
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Your points balance has been updated. You will be redirected shortly.
        </p>
      </div>
    </div>
  );
}
