
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PickupView } from '@/components/app/pickup-view';
import { DropOffView } from '@/components/app/dropoff-view';
import { PageHeader } from '@/components/app/page-header';

export default function MapPage() {
  const [activeTab, setActiveTab] = useState('pickup');
  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      <PageHeader title="Live Tracking" backHref="/" />
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pickup">Pickup</TabsTrigger>
            <TabsTrigger value="dropoff">Drop Off</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative w-full flex-shrink-0 h-1/3">
        <Image
          src="https://picsum.photos/seed/map/1920/1080"
          alt="Map placeholder"
          fill
          className="object-cover"
          data-ai-hint="street map"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="pickup" className="m-0">
            <PickupView />
          </TabsContent>
          <TabsContent value="dropoff" className="m-0">
            <DropOffView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
