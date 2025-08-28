
'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CompletionAnimation } from '@/components/app/completion-animation';
import { Loader2 } from 'lucide-react';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get('title') || 'Success!';
  const message = searchParams.get('message') || 'Your operation was successful.';
  const redirectUrl = searchParams.get('redirectUrl') || '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectUrl);
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [router, redirectUrl]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/50 p-4">
       <div className="text-center">
        <CompletionAnimation />
        <h1 className="mt-8 text-3xl font-bold tracking-tighter text-white sm:text-4xl">
          {decodeURIComponent(title)}
        </h1>
        <p className="mt-4 max-w-md text-white/80">
          {decodeURIComponent(message)}
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>}>
            <SuccessContent />
        </Suspense>
    );
}
