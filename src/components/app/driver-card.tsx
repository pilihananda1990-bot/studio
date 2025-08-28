
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, MessageSquare, Phone, ChevronRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { PickupView } from '@/components/app/pickup-view';
import { cn } from '@/lib/utils';


export function DriverCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
        "bg-background/90 dark:bg-zinc-900/90 backdrop-blur-md transition-all duration-300 ease-in-out rounded-t-2xl overflow-hidden",
        isExpanded ? 'h-[80vh]' : 'h-auto'
      )}>
      
      <div className="p-4 flex flex-col h-full">
         <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex justify-center py-1">
          <div className="w-10 h-1.5 bg-muted-foreground/30 rounded-full" />
        </button>
        
        <div className="flex items-center gap-3 mt-2">
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

        <Separator className="my-4" />

        {!isExpanded && (
           <Button variant="secondary" className="w-full" onClick={() => setIsExpanded(true)}>
             View Pickup Details
             <ChevronUp className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {isExpanded && (
          <div className="flex-1 overflow-y-auto -mx-4">
            <PickupView />
          </div>
        )}

      </div>
    </div>
  );
}
