
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
      
      <Card className="rounded-t-lg rounded-b-none border-t-2 border-x-0 border-b-0">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium">{order.status}</p>
              <p className="text-lg font-bold">{order.eta}</p>
          </div>
          <Separator />
          <div className="flex items-center space-x-4 pt-4">
              <Avatar className="h-16 w-16">
                  <AvatarImage src={driver.avatar} alt={driver.name} />
                  <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{driver.name}</p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/> 
                      <span>{driver.rating}</span>
                    </div>
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
  );
}
