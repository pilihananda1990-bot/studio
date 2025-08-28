
'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Send, ChevronRight, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { RatingOverlay } from '@/components/app/rating-overlay';

export function PickupView() {
  const driver = {
    name: 'Peter Markent',
    avatar: 'https://i.pravatar.cc/150?u=driver1',
    rating: 4.8,
    car: 'Honda Brio - White',
    plate: 'B 1234 XYZ'
  };

  const order = {
    address: 'Gatot Subroto Street 8129',
    pickupType: 'Warehouse Pickup',
    eta: '12 min Estimated',
    bookingNumber: 'AB321481251245612',
    from: 'Minnesota, USA',
    to: 'New York, USA',
    created: '04 June 2025',
  };
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const trackingHistory = [
    {
      status: 'Moving From O Tempora',
      timestamp: 'June 6, 2025 02:00 AM',
      isCompleted: true,
    },
    {
      status: 'In Transit to Warehouse Masion',
      timestamp: 'June 6, 2025 2:00 PM',
      isCompleted: true,
    },
    {
      status: 'Arrived at Destination',
      timestamp: 'June 6, 2025 4:30 PM',
      isCompleted: isSuccess, // This will change based on state
    },
  ];

  return (
    <>
      <div className="p-4 space-y-4">
        {/* Estimated Arrival Bar */}
        <div className="bg-muted/50 p-3 rounded-lg flex items-center justify-between text-sm">
            <div>
                <p className="text-muted-foreground">Estimated Arrival</p>
                <p className="font-bold">{order.eta}</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
             <div>
                <p className="text-muted-foreground">Your Location</p>
                <p className="font-bold truncate">{order.address}</p>
            </div>
        </div>

        {/* Driver Info Card */}
        <div className="p-3 bg-muted/50 rounded-lg">
           <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={driver.avatar} alt={driver.name} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{driver.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{driver.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full border-gray-300">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-300">
                  <Phone className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="text-sm text-center font-medium">
                {driver.car} &bull; {driver.plate}
            </div>
        </div>

        {/* Order Details Card */}
        <div className="p-3 bg-muted/50 rounded-lg">
             <h3 className="font-semibold mb-2">Order Details</h3>
             <Button variant="outline" className="w-full justify-between">
                Review Order Items
                <ChevronRight className="w-4 h-4" />
             </Button>
        </div>


        {/* Tracking Order Card */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-4">Tracking Order</h3>
          <div className="relative space-y-6 pl-1">
            {/* Dashed line connecting the dots */}
            <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-border" />

            {trackingHistory.map((item, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <div className="z-10 mt-1 flex-shrink-0">
                  <div className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center',
                      item.isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.status}</p>
                  <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
           {!isSuccess ? (
             <Button className="w-full mt-4" onClick={() => setIsSuccess(true)}>
                Simulate Success
            </Button>
            ) : (
             <Button className="w-full mt-4" onClick={() => setIsRatingOpen(true)}>
                Rate Driver
            </Button>
            )}
        </div>
      </div>
      <RatingOverlay isOpen={isRatingOpen} onOpenChange={setIsRatingOpen} />
    </>
  );
}
