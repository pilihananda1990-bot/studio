
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, MessageSquare, Phone } from 'lucide-react';

export function DriverCard() {
  return (
    <Card className="m-4 rounded-2xl bg-background/80 dark:bg-card/80 backdrop-blur-md border-border/50">
      <CardContent className="p-4 space-y-4">
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
             <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-card/80">
                <MessageSquare className="w-5 h-5" />
            </Button>
            <Button size="icon" className="rounded-full w-10 h-10">
                <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Separator />
        
        <Button variant="secondary" className="w-full h-12 text-base">
            Order Details
        </Button>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                    <p className="text-muted-foreground text-xs">Your Address</p>
                    <p className="font-semibold leading-tight">337 Russell St, Hadley MA</p>
                </div>
            </div>
             <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                    <p className="text-muted-foreground text-xs">Delivery Time</p>
                    <p className="font-semibold leading-tight">Just 15 Minutes</p>
                </div>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
