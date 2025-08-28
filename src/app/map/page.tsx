
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
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const confirmationTimer = setTimeout(() => {
      setStatus('confirmed');
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(confirmationTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-muted/20">
      <PageHeader title="Track Pickup" />

      <div className="flex-grow flex flex-col">
        <div className="relative" style={{ height: '60vh' }}>
            <Image
                src="https://picsum.photos/seed/map-background/1080/1920"
                alt="Map background"
                layout="fill"
                objectFit="cover"
                data-ai-hint="street map"
            />
        </div>
        
        <div className="flex-shrink-0 bg-background flex-grow">
          {isLoading ? (
            <div className="w-full p-6 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 font-semibold text-lg">Finding a driver for you...</p>
              <p className="text-muted-foreground">Please wait while we assign a pickup team.</p>
            </div>
          ) : status === 'preparing' ? (
             <div className="w-full p-6 text-center">
                <p className="font-semibold text-lg">Preparing a driver</p>
                <p className="text-muted-foreground">We're finding the best team for your pickup.</p>
            </div>
          ) : (
            <DriverCard />
          )}
        </div>
      </div>
    </div>
  );
}
