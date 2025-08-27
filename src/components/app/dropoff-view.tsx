

'use client';

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
    <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Drop Off Locations</h2>
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
  );
}
