
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropOffView } from '@/components/app/dropoff-view';
import { PickupView } from '@/components/app/pickup-view';
import Image from 'next/image';
import { PageHeader } from '@/components/app/page-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="flex h-full w-full flex-col bg-background">
       <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-10">
         <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon" className="-ml-2">
                    <Link href="/">
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold truncate">Live Tracking</h1>
            </div>
             <Button variant="ghost" size="icon">
                <Share2 />
                <span className="sr-only">Share</span>
            </Button>
        </div>
       </header>

      <div className="flex-grow relative w-full h-96">
        <Image
          src="https://picsum.photos/seed/map/1920/1080"
          alt="Map placeholder"
          fill
          className="object-cover"
          data-ai-hint="street map"
        />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
            <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full" />
            </div>
        </div>
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
            <Image src="/images/car.svg" alt="Driver's car" width={32} height={32} />
            </div>
        </div>
      </div>

      <Tabs defaultValue="pickup" className="relative flex-1 flex flex-col">
        <div className="flex justify-center py-4 border-b">
          <TabsList>
            <TabsTrigger value="pickup">Pickup</TabsTrigger>
            <TabsTrigger value="dropoff">Drop Off</TabsTrigger>
          </TabsList>
        </div>
        <ScrollArea className="flex-1">
          <TabsContent value="pickup" className="m-0">
            <PickupView />
          </TabsContent>
          <TabsContent value="dropoff" className="m-0">
            <DropOffView />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
