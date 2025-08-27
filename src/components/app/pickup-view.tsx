
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Star, MapPin, Flag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PickupView() {
  const driver = {
    name: 'John Smith',
    plate: 'XYZ-1234',
    avatar: 'https://i.pravatar.cc/150?u=driver1',
    rating: 4.8,
    vehicle: 'Honda Brio - White',
  };

  const order = {
    status: 'Driver on the way',
    eta: '15 minutes',
    distance: '3.2 km away',
    pickupAddress: '123 Main Street, Greenville, 12345',
    dropoffAddress: '456 Oak Avenue, Greenville, 12345',
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex-grow relative w-full">
         <Image
          src="https://picsum.photos/seed/map/1920/1080"
          alt="Map placeholder"
          fill
          className="object-cover"
          data-ai-hint="street map"
        />
        {/* User's pickup location pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
            <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full" />
            </div>
        </div>

        {/* Driver's location pin */}
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
            <Image src="/car.svg" alt="Driver's car" width={32} height={32} />
            </div>
        </div>
      </div>
      
      <Separator />

      <div className="p-4 flex-shrink-0 bg-background">
         <Card>
            <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={driver.avatar} alt={driver.name} />
                        <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-bold text-lg">{driver.name}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/> 
                        <span>{driver.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{driver.vehicle} &middot; {driver.plate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                            <MessageCircle />
                            <span className="sr-only">Message Driver</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                            <Phone />
                            <span className="sr-only">Call Driver</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
