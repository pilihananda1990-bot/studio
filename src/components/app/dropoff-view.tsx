
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Navigation } from 'lucide-react';

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
];

export function DropOffView() {
  const handleNavigate = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  return (
    <div className="relative h-full w-full">
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

      <div className="absolute top-16 left-0 right-0 p-4 md:w-1/3 md:left-auto">
        <Card>
          <CardHeader>
            <CardTitle>Drop Off Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
