
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropOffView } from '@/components/app/dropoff-view';
import { PickupView } from '@/components/app/pickup-view';

export default function MapPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <Tabs defaultValue="pickup" className="relative h-full flex-1 flex flex-col">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <TabsList>
            <TabsTrigger value="pickup">Pickup</TabsTrigger>
            <TabsTrigger value="dropoff">Drop Off</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pickup" className="h-full flex-1 m-0">
          <PickupView />
        </TabsContent>
        <TabsContent value="dropoff" className="h-full flex-1 m-0">
          <DropOffView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
