
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function PickupView() {
  const driver = {
    name: 'John Smith',
    plate: 'XYZ-1234',
    avatar: 'https://i.pravatar.cc/150?u=driver1',
    rating: 4.8,
    vehicle: 'Toyota Camry - White',
  };

  const order = {
    status: 'Driver on the way',
    eta: '15 minutes',
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
      
      <div className="flex-shrink-0">
        <Card className="rounded-t-lg rounded-b-none border-t-2 border-x-0 border-b-0">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={driver.avatar} alt={driver.name} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold text-lg">{driver.name} <span className="font-normal text-muted-foreground">★ {driver.rating}</span></p>
                <p className="text-muted-foreground">
                  {driver.vehicle} &middot; {driver.plate}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
             <Separator className="my-4" />
            <div className="flex justify-between items-center">
                 <div>
                    <p className="text-sm text-muted-foreground">ETA</p>
                    <p className="font-bold text-2xl text-primary">{order.eta}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <MessageCircle />
                         <span className="sr-only">Message Driver</span>
                    </Button>
                     <Button variant="outline" size="icon">
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
