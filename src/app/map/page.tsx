
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { DriverCard } from '@/components/app/driver-card';
import { PageHeader } from '@/components/app/page-header';

export default function MapPage() {
  const [status, setStatus] = useState<'preparing' | 'confirmed'>('preparing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading/preparation time
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Simulate driver confirmation after a delay
    const confirmationTimer = setTimeout(() => {
      setStatus('confirmed');
    }, 5000); // 5 seconds to find a driver

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(confirmationTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-muted/20">
      <PageHeader title="Track Pickup" />

      <div className="flex-grow relative">
        <div className="absolute inset-0">
            <Image
            src="https://picsum.photos/seed/map-background/1080/1920"
            alt="Map background"
            layout="fill"
            objectFit="cover"
            data-ai-hint="street map"
            />
            {status === 'confirmed' && (
                <Image
                    src="/images/route-line.svg"
                    alt="Route line"
                    layout="fill"
                    objectFit="contain"
                    className="opacity-80"
                />
            )}
        </div>
      </div>
      
      <div className="flex-shrink-0">
        {isLoading || status === 'preparing' ? (
          <div className="w-full bg-background p-6 text-center rounded-t-2xl">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 font-semibold text-lg">Finding a driver for you...</p>
            <p className="text-muted-foreground">Please wait while we assign a pickup team.</p>
          </div>
        ) : (
          <DriverCard />
        )}
      </div>
    </div>
  );
}
