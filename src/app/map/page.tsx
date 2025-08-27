
'use client';

import { PickupView } from '@/components/app/pickup-view';
import Image from 'next/image';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-background/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Button asChild variant="ghost" size="icon" className="-ml-2">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Track Your Order</h1>
          <Button variant="ghost" size="icon">
            <Share2 />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </header>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/map/1920/1080"
          alt="Map placeholder"
          fill
          className="object-cover"
          data-ai-hint="street map"
        />
        {/* You can add map markers or route overlays here */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping" />
            <div className="absolute top-0 left-0 w-3 h-3 bg-blue-600 rounded-full" />
          </div>
        </div>
         <div className="absolute top-1/3 left-1/4">
           <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
              <div className="w-5 h-5 i-lucide-home text-gray-700"></div>
           </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex h-[60%] flex-col">
        <div className="flex-1 overflow-y-auto rounded-t-2xl bg-white shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]">
          <PickupView />
        </div>
      </div>
    </div>
  );
}
