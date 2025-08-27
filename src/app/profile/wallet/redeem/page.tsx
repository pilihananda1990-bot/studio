
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowLeft } from 'lucide-react';
import { redemptionCategories, userPoints as initialUserPoints } from '@/lib/data/wallet';
import type { RedemptionOption } from '@/lib/types';
import { RedeemConfirmation } from '@/components/app/redeem-confirmation';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RedeemPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<RedemptionOption | null>(null);
  const [userPoints, setUserPoints] = useState(initialUserPoints);

  const handleSelect = (item: RedemptionOption) => {
    if (userPoints >= item.points) {
      setSelectedItem(item);
    } else {
      toast({
        variant: "destructive",
        title: 'Not enough points',
        description: 'You do not have enough points to redeem this item.',
      });
    }
  };

  const handleConfirm = () => {
    if (selectedItem) {
      // Here you would typically call an API to confirm the redemption.
      // For this example, we'll just update the state and navigate.
      setUserPoints(userPoints - selectedItem.points);
      setSelectedItem(null);
      router.push('/profile/wallet/redeem-success');
    }
  };

  const handleCancelConfirmation = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon" className="-ml-2">
                    <Link href="/profile/wallet">
                    <ArrowLeft />
                    <span className="sr-only">Back to Wallet</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Redeem Points</h1>
            </div>
        </div>

        <p className="text-muted-foreground mb-4">
          Your current balance is {userPoints.toLocaleString('en-US')} points. Choose from the options below.
        </p>
        <Separator className="mb-8" />
        
        <div className="space-y-6">
          {redemptionCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div key={item.id}>
                      <div 
                        className="flex items-center gap-4 p-3 -mx-3 rounded-lg cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSelect(item)}
                        role="button"
                        aria-label={`Redeem ${item.name} for ${item.points} points`}
                      >
                        <div className="relative h-14 w-14 rounded-md overflow-hidden bg-white flex items-center justify-center border shrink-0">
                          <Image src={item.icon} alt={item.name} width={36} height={36} className="object-contain" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center gap-1.5 mt-1 text-primary">
                            <Star className="w-4 h-4" />
                            <span className="font-bold">{item.points.toLocaleString('en-US')}</span>
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
      </div>
      
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
