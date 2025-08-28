
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { DriverCard } from '@/components/app/driver-card';
import { PageHeader } from '@/components/app/page-header';
import { usePickup } from '@/context/pickup-context';
import { DropOffView } from '@/components/app/dropoff-view';

export default function MapPage() {
  const { pickupStatus, driverDetails, assignDriver } = usePickup();

  useEffect(() => {
    // Simulate finding and assigning a driver if a pickup is active
    if (pickupStatus === 'searching') {
      const timer = setTimeout(() => {
        assignDriver({
          name: 'Roger Walker',
          role: 'Waste Pickup Team Member',
          avatarUrl: 'https://i.pravatar.cc/150?u=roger',
          rating: 4.8,
          vehicle: 'Toyota Hilux - B 1234 ABC',
        });
      }, 3000); // Assign a driver after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [pickupStatus, assignDriver]);

  const renderContent = () => {
    switch (pickupStatus) {
      case 'searching':
        return (
          <div className="w-full p-6 text-center bg-background/90 backdrop-blur-sm rounded-t-2xl">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 font-semibold text-lg">Finding a driver for you...</p>
            <p className="text-muted-foreground">Please wait while we assign a pickup team.</p>
          </div>
        );
      case 'confirmed':
        return <DriverCard />;
      case 'completed':
      case 'idle':
      default:
        return <DropOffView />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-muted/20">
      <PageHeader title="Track Pickup" />

      <div className="flex-grow flex flex-col relative">
        <div className="fixed top-16 left-0 right-0 bottom-0">
            <Image
                src="https://picsum.photos/seed/map-background/1080/1920"
                alt="Map background"
                layout="fill"
                objectFit="cover"
                data-ai-hint="street map"
            />
        </div>
        
        <div className="relative z-10 mt-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
