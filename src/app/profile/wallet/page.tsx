
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Gift, ArrowLeft } from 'lucide-react';
import { transactionHistory as initialHistory, userPoints as initialPoints } from '@/lib/data/wallet';
import type { Transaction } from '@/lib/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { CompletionAnimation } from '@/components/app/completion-animation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
  const router = useRouter();
  const [userPoints, setUserPoints] = useState(initialPoints);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(initialHistory);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRedemption = (pointsToDeduct: number, itemName: string) => {
     if (userPoints >= pointsToDeduct) {
      setShowSuccessAnimation(true);
      
      setTimeout(() => {
        const newPoints = userPoints - pointsToDeduct;
        setUserPoints(newPoints);

        const newTransaction: Transaction = {
          id: `txn-${Date.now()}`,
          date: new Date().toISOString(),
          description: `Redeemed: ${itemName}`,
          points: -pointsToDeduct,
        };
        setTransactionHistory([newTransaction, ...transactionHistory]);
        
        setShowSuccessAnimation(false);
        
        toast({
          title: 'Redemption Successful!',
          description: 'Your points balance has been updated.',
        });

      }, 2000);

    } else {
       toast({
        variant: "destructive",
        title: 'Redemption Failed',
        description: 'You do not have enough points.',
      });
    }
  };

  return (
    <>
      {showSuccessAnimation && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
           <div className="text-center">
            <CompletionAnimation />
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon" className="-ml-2">
                    <Link href="/profile">
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">My Wallet</h1>
            </div>
            <div className="text-right">
                <p className="font-mono text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                 <p className="text-sm text-muted-foreground font-mono">
                    {currentTime || 'Loading...'}
                </p>
            </div>
        </div>

          <p className="text-muted-foreground mb-8">View your points balance and transaction history.</p>

          <div className="p-6 bg-primary/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  <p className="text-4xl font-bold">{userPoints.toLocaleString('en-US')}</p>
                  <span className="text-lg text-muted-foreground">points</span>
                </div>
            </div>
            <Button size="lg" onClick={() => router.push('/profile/wallet/redeem')}>
              <Gift className="mr-2"/>
              Redeem Points
            </Button>
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
            <div className="space-y-4">
              {transactionHistory.length > 0 ? (
                transactionHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), "PPP p")}
                      </p>
                    </div>
                      <p className={`font-bold text-lg ${transaction.points > 0 ? 'text-green-500' : 'text-destructive'}`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points.toLocaleString('en-US')}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No transactions yet.</p>
              )}
            </div>
          </div>
      </div>
    </>
  );
}
