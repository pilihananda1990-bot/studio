
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function PickupView() {
  const driver = {
    name: 'John Smith',
    plate: 'XYZ-1234',
    avatar: 'https://i.pravatar.cc/150?u=driver1',
  };

  const order = {
    status: 'Driver on the way',
    eta: '15 minutes',
  };

  return (
    <div className="relative h-full w-full">
      <Image
        src="https://picsum.photos/seed/map/1920/1080"
        alt="Map placeholder"
        fill
        className="object-cover"
        data-ai-hint="street map"
      />
      <div className="absolute inset-0 bg-black/10" />

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

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Pickup Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={driver.avatar} alt={driver.name} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-lg">{driver.name}</p>
                <p className="text-muted-foreground">
                  License Plate: {driver.plate}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold text-primary">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ETA</p>
                <p className="font-semibold">{order.eta}</p>
              </div>
            </div>
            <Button className="w-full mt-4">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat with Driver
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
