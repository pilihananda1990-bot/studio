
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

const dropOffLocations = [
  {
    id: 1,
    name: 'ABC Recycling Center',
    hours: 'Mon-Fri: 9am - 5pm',
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 2,
    name: 'Green Earth Facility',
    hours: 'Mon-Sat: 8am - 6pm',
    lat: 34.0622,
    lng: -118.2537,
  },
  {
    id: 3,
    name: 'Eco Savers Point',
    hours: '24/7',
    lat: 34.0422,
    lng: -118.2637,
  },
   {
    id: 4,
    name: 'City Central Recycling',
    hours: 'Mon-Fri: 8am - 4pm',
    lat: 34.055,
    lng: -118.235,
  },
];

export function DropOffView() {
  const handleNavigate = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
        <div className="flex-grow relative w-full">
            <Image
                src="https://picsum.photos/seed/map-dark/1920/1080"
                alt="Map placeholder"
                fill
                className="object-cover"
                data-ai-hint="dark street map"
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Pins for drop-off locations */}
            <div className="absolute top-1/2 left-1/4">
                <MapPin className="w-8 h-8 text-destructive" />
            </div>
            <div className="absolute top-1/3 left-2/3">
                <MapPin className="w-8 h-8 text-destructive" />
            </div>
            <div className="absolute top-2/3 left-1/2">
                <MapPin className="w-8 h-8 text-destructive" />
            </div>
             <div className="absolute top-1/2 left-3/4">
                <MapPin className="w-8 h-8 text-destructive" />
            </div>
        </div>

        <div className="flex-shrink-0">
             <Card className="rounded-t-lg rounded-b-none border-t-2 border-x-0 border-b-0">
                <CardHeader>
                    <CardTitle>Drop Off Locations</CardTitle>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-48">
                     <div className="space-y-4 pr-4">
                        {dropOffLocations.map((location) => (
                        <div key={location.id} className="p-3 bg-muted/50 rounded-lg">
                            <h3 className="font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" /> {location.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {location.hours}
                            </p>
                            <Button
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => handleNavigate(location.lat, location.lng)}
                            >
                            <Navigation className="mr-2 h-4 w-4" />
                            Navigate
                            </Button>
                        </div>
                        ))}
                    </div>
                   </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
