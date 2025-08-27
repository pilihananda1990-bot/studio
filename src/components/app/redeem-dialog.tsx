
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { redemptionCategories } from '@/lib/data';
import type { RedemptionOption } from '@/lib/types';
import { RedeemConfirmation } from './redeem-confirmation';

type RedeemDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  onRedeem: (points: number, itemName: string) => void;
};

export function RedeemDialog({ isOpen, onClose, userPoints, onRedeem }: RedeemDialogProps) {
  const [selectedItem, setSelectedItem] = useState<RedemptionOption | null>(null);

  const handleSelect = (item: RedemptionOption) => {
    setSelectedItem(item);
  };

  const handleConfirm = () => {
    if (selectedItem) {
      onRedeem(selectedItem.points, selectedItem.name);
      setSelectedItem(null);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Your Points</DialogTitle>
            <DialogDescription>
              Choose from the options below to redeem your points. Your current balance is {userPoints.toLocaleString()} points.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {redemptionCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <Card 
                      key={item.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleSelect(item)}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <Image src={item.icon} alt={item.name} width={48} height={48} className="mb-2" />
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex items-center gap-1 mt-1 text-primary">
                           <Star className="w-4 h-4" />
                           <span className="font-bold">{item.points.toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      <RedeemConfirmation
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        userPoints={userPoints}
        onConfirm={handleConfirm}
      />
    </>
  );
}

