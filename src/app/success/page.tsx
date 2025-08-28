
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
    }, 4000); // Redirect after 4 seconds

    return () => clearTimeout(timer);
  }, [router, redirectUrl]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-4">
       <div className="text-center">
        <CompletionAnimation />
        <h1 className="mt-8 text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          {decodeURIComponent(title)}
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          {decodeURIComponent(message)}
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <SuccessContent />
        </Suspense>
    );
}
