
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RecyclableItem } from '@/lib/types';

type ItemInteractionProps = {
  item: RecyclableItem;
};

export function ItemInteraction({ item }: ItemInteractionProps) {
  const [weight, setWeight] = useState(1);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or valid numbers
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
       setWeight(parseFloat(value) || 0);
    }
  };

  const estimatedPoints = (item.pricePerKg * weight).toFixed(2);

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
      <div className="container mx-auto px-0">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 items-center">
             <div>
                <label htmlFor="weight-input" className="text-sm font-medium text-muted-foreground">Estimated Weight (kg)</label>
                 <Input
                  id="weight-input"
                  type="number"
                  value={weight === 0 ? '' : weight}
                  onChange={handleWeightChange}
                  className="mt-1 font-bold text-lg"
                  placeholder="e.g., 5"
                />
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated Earnings</p>
                <p className="text-xl font-bold text-primary">${estimatedPoints}</p>
            </div>
          </div>
          
          <Button asChild size="lg" className="w-full" disabled={!weight || weight <= 0}>
            <Link href={`/confirmation?itemId=${item.id}&weight=${weight}`}>Schedule Pickup</Link>
          </Button>

        </div>
      </div>
    </div>
  );
}
