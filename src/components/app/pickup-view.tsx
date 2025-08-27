
'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Star, CheckCircle, Package } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { RatingOverlay } from '@/components/app/rating-overlay';

export function PickupView() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(2); // Start at "Driver Assigned"

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
    { id: 1, title: 'Confirmed' },
    { id: 2, title: 'Assigned' },
    { id: 3, title: 'On The Way' },
    { id: 4, title: 'Completed' },
  ];

  const isPickupCompleted = currentStep >= trackingSteps.length;

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < trackingSteps.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 3000); // Advance every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ETA and Address */}
      <div className="flex justify-between items-center p-6 pb-0">
        <div>
          <p className="text-sm text-muted-foreground">Estimated Arrival</p>
          <p className="text-lg font-bold">{isPickupCompleted ? "Arrived" : order.eta}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Your Location</p>
          <p className="font-semibold">{order.address}</p>
        </div>
      </div>

      <div className="px-6">
        <Separator className="my-6" />
      </div>
      

      {/* Driver Information */}
      <div className="flex items-center space-x-4 px-6">
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

      {/* Tracking Timeline */}
      <div className="pt-8 px-6">
        <div className="flex justify-between items-center">
          {trackingSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300',
                    index < currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border'
                  )}
                >
                  {index < currentStep && <CheckCircle className="w-4 h-4" />}
                </div>
                <p
                  className={cn(
                    'text-xs mt-1 transition-colors duration-300',
                      index < currentStep ? 'font-semibold text-primary' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
              </div>
              {index < trackingSteps.length - 1 && (
                <div className={cn(
                    'flex-1 h-0.5 -mt-4 mx-2',
                    index < currentStep - 1 ? 'bg-primary' : 'bg-border'
                  )} 
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="px-6">
          <Separator className="my-6" />
      </div>

      {/* Order Details */}
      <div className="px-6">
        <h3 className="text-lg font-semibold mb-2">Order Details</h3>
        <Button variant="outline" className="w-full justify-between">
          <span>Review Order Items</span>
          <Package />
        </Button>
      </div>

      {isPickupCompleted && (
        <>
          <div className="px-6">
            <Separator className="my-6" />
          </div>
          <div className="text-center space-y-2 px-6 pb-6">
            <h3 className="text-lg font-semibold">Pickup Complete!</h3>
            <p className="text-muted-foreground">Thank you for helping the environment.</p>
            <Button onClick={() => setIsRatingOpen(true)} className="mt-2">
              <Star className="mr-2" />
              Rate Driver
            </Button>
          </div>
        </>
      )}

      <RatingOverlay isOpen={isRatingOpen} onOpenChange={setIsRatingOpen} />
    </>
  );
}
