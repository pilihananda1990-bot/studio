
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, MessageSquare, Phone, ChevronRight } from 'lucide-react';

export function DriverCard() {
  return (
    <div className="p-4 bg-background/90 dark:bg-zinc-900/90 backdrop-blur-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-primary/50">
            <AvatarImage src="https://i.pravatar.cc/150?u=roger" />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Roger Walker</h3>
            <p className="text-sm text-muted-foreground">Waste Pickup Team Member</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                <MessageSquare className="w-5 h-5" />
            </Button>
            <Button size="icon" className="rounded-full w-10 h-10">
                <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Separator />
        
        <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold">Your driver is on the way!</h4>
                    <p className="text-sm text-muted-foreground">Estimated arrival in 15 minutes.</p>
                </div>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <ChevronRight />
                </Button>
            </div>
        </div>

      </div>
    </div>
  );
}
