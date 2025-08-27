
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Star } from 'lucide-react';
import { redemptionCategories } from '@/lib/data/wallet';
import type { RedemptionOption } from '@/lib/types';
import { RedeemConfirmation } from './redeem-confirmation';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

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
    }
  };

  const handleCancelConfirmation = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md p-0">
            <ScrollArea className="max-h-[75vh]">
              <div className="p-6">
                <DialogTitle className="text-center text-2xl">Redeem Your Points</DialogTitle>
                <DialogDescription className="text-center mt-2 mb-4">
                  Your current balance is {userPoints.toLocaleString()} points. Choose from the options below.
                </DialogDescription>
                 <Separator />
              </div>
              <div className="px-6 pb-6 space-y-4">
                {redemptionCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
                    <div className="space-y-2">
                      {category.items.map((item, index) => (
                        <div key={item.id}>
                           <div 
                              className="flex items-center gap-4 p-2 -mx-2 rounded-lg cursor-pointer hover:bg-muted/50"
                              onClick={() => handleSelect(item)}
                            >
                              <div className="relative h-12 w-12 rounded-md overflow-hidden bg-white flex items-center justify-center border">
                                <Image src={item.icon} alt={item.name} width={32} height={32} className="object-contain" />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium">{item.name}</p>
                                <div className="flex items-center gap-1 mt-1 text-primary">
                                  <Star className="w-4 h-4" />
                                  <span className="font-bold">{item.points.toLocaleString()}</span>
                                </div>
                              </div>
                          </div>
                          {index < category.items.length - 1 && <Separator className="mt-2" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <RedeemConfirmation
        isOpen={!!selectedItem}
        onClose={handleCancelConfirmation}
        item={selectedItem}
        userPoints={userPoints}
        onConfirm={handleConfirm}
      />
    </>
  );
}
