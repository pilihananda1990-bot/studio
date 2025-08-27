
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
    <>
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Estimated Weight</h3>
          <div className="flex items-center gap-4 mt-2">
            <Weight className="h-6 w-6 text-muted-foreground" />
            <Slider
              defaultValue={[weight]}
              max={50}
              min={1}
              step={1}
              onValueChange={(value) => setWeight(value[0])}
            />
            <span className="font-bold text-lg w-24 text-center">{weight} kg</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Adjust the slider to estimate the weight of your items.</p>
        </div>
        <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Price / kg</h3>
          <p className="text-2xl font-bold text-primary">${item.pricePerKg.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center bg-accent/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Estimated Points</h3>
          <p className="text-2xl font-bold text-accent-foreground">${estimatedPoints}</p>
        </div>
      </div>

      <div className="mt-4">
        <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/confirmation?itemId=${item.id}&weight=${weight}`}>Schedule Pickup</Link>
        </Button>
      </div>
    </>
  );
}
