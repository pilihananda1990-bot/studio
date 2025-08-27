
'use client';

import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Star, CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { RatingOverlay } from '@/components/app/rating-overlay';

export function PickupView() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  // In a real app, this would come from an API. We simulate it here.
  const [isPickupCompleted, setIsPickupCompleted] = useState(false);

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
    address: 'Gatot Subroto Street 8129',
  };
  
  const trackingSteps = [
    { id: 1, title: 'Order Confirmed', time: '10:30 AM', completed: true },
    { id: 2, title: 'Driver Assigned', time: '10:32 AM', completed: true },
    { id: 3, title: 'Driver on the way', time: '10:35 AM', completed: true },
    { id: 4, title: 'Arriving Soon', time: '10:50 AM', completed: isPickupCompleted },
    { id: 5, title: 'Order Completed', time: isPickupCompleted ? '10:55 AM' : '', completed: isPickupCompleted },
  ];

  // Simulate pickup completion after a delay
  useState(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setIsPickupCompleted(true);
      }, 5000); // Complete after 5 seconds
    }
  });


  return (
    <>
      <div className="w-full bg-background p-6 space-y-6">
        {/* ETA and Address */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Estimated Arrival</p>
            <p className="text-lg font-bold">{isPickupCompleted ? "Completed" : order.eta}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Your Location</p>
            <p className="font-semibold">{order.address}</p>
          </div>
        </div>

        <Separator />

        {/* Driver Information */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={driver.avatar} alt={driver.name} />
            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{driver.name}</p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{driver.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {driver.vehicle} &middot; {driver.plate}
            </p>
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
        
        <Separator />

        {/* Order Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Details</h3>
          <Button variant="outline" className="w-full justify-between">
              <span>Review Order Items</span>
              <Package />
          </Button>
        </div>

        <Separator />

        {/* Tracking Timeline */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tracking Order</h3>
          <div className="space-y-6 relative">
            {/* Dotted line */}
            <div className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-border -translate-x-1/2"></div>
            
            {trackingSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-4 relative">
                <div className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center border-2 z-10",
                  step.completed ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
                )}>
                  {step.completed ? <CheckCircle className="w-5 h-5" /> : <Truck className="w-5 h-5"/>}
                </div>
                <div className="pt-1.5">
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isPickupCompleted && (
          <>
            <Separator />
            <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Pickup Complete!</h3>
                <p className="text-muted-foreground">Thank you for helping the environment.</p>
                <Button onClick={() => setIsRatingOpen(true)} className="mt-2">
                    <Star className="mr-2" />
                    Rate Driver
                </Button>
            </div>
          </>
        )}
      </div>

      <RatingOverlay isOpen={isRatingOpen} onOpenChange={setIsRatingOpen} />
    </>
  );
}
