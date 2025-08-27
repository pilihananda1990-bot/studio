
'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { RatingOverlay } from '@/components/app/rating-overlay';

export function PickupView() {
  const driver = {
    name: 'Peter Markent',
    avatar: 'https://i.pravatar.cc/150?u=driver1',
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
      isCompleted: false,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Address Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">{order.address}</h2>
          <p className="text-sm opacity-90">{`${order.pickupType} • ${order.eta}`}</p>
        </div>
        <Button size="icon" className="rounded-full bg-white text-blue-600 hover:bg-gray-100 h-10 w-10">
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Driver Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={driver.avatar} alt={driver.name} />
            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{driver.name}</p>
            <p className="text-sm text-gray-500">Driver</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-lg border-gray-300">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-lg border-gray-300">
              <Phone className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Review Order */}
        <div>
          <h3 className="font-semibold mb-2">Review Order</h3>
          <div className="rounded-lg border border-gray-200 p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Booking Number</p>
                <p className="font-bold text-base">{order.bookingNumber}</p>
              </div>
              <Button variant="link" className="text-blue-600 font-semibold h-auto p-0">
                See Details
              </Button>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-start text-sm">
              <div>
                <p className="text-gray-500 mb-1">From</p>
                <p className="font-semibold">{order.from}</p>
              </div>
              <div className="text-center">
                 <p className="text-gray-500 mb-1">To</p>
                 <p className="font-semibold">{order.to}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 mb-1">Created</p>
                <p className="font-semibold">{order.created}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Order */}
        <div>
          <h3 className="font-semibold mb-3">Tracking Order</h3>
          <div className="relative space-y-6 pl-1">
            {/* Dashed line connecting the dots */}
            <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-gray-200" />

            {trackingHistory.map((item, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <div className="z-10 mt-1">
                  <div className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center',
                      item.isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                    )}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.status}</p>
                  <p className="text-xs text-gray-500">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
