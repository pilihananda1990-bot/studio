
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Weight } from 'lucide-react';
import type { RecyclableItem } from '@/lib/types';

type ItemInteractionProps = {
  item: RecyclableItem;
};

export function ItemInteraction({ item }: ItemInteractionProps) {
  const [weight, setWeight] = useState(5); // Default weight 5kg

  const estimatedPoints = (item.pricePerKg * weight).toFixed(2);

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t py-4">
        <div className="container mx-auto px-4">
            <div className="grid gap-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">Estimated Weight</h3>
                         <span className="font-bold text-lg w-24 text-right">{weight} kg</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Weight className="h-6 w-6 text-muted-foreground" />
                        <Slider
                        defaultValue={[weight]}
                        max={50}
                        min={1}
                        step={1}
                        onValueChange={(value) => setWeight(value[0])}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center bg-primary/10 p-3 rounded-lg">
                    <h3 className="text-base font-medium">Estimated Earnings</h3>
                    <p className="text-xl font-bold text-primary">${estimatedPoints}</p>
                </div>
            </div>

            <div className="mt-4">
                <Button asChild size="lg" className="w-full">
                <Link href={`/confirmation?itemId=${item.id}&weight=${weight}`}>Schedule Pickup</Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
