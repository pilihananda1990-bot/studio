
'use client';

import { AppHeader } from '@/components/app/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropOffView } from '@/components/app/dropoff-view';
import { PickupView } from '@/components/app/pickup-view';

export default function MapPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <Tabs defaultValue="pickup" className="relative h-full">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <TabsList>
              <TabsTrigger value="pickup">Pickup</TabsTrigger>
              <TabsTrigger value="dropoff">Drop Off</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pickup" className="h-full m-0">
            <PickupView />
          </TabsContent>
          <TabsContent value="dropoff" className="h-full m-0">
            <DropOffView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
