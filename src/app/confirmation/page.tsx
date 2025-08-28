
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { getItemById } from '@/lib/data/recyclables';
import type { RecyclableItem } from '@/lib/types';
import { PageHeader } from '@/components/app/page-header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Edit2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PickupData {
  itemId: string;
  weight: number;
  imageUrl: string | null;
}

function ConfirmationContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [pickupData, setPickupData] = useState<PickupData | null>(null);
  const [item, setItem] = useState<RecyclableItem | undefined>(undefined);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem('pickupData');
      if (data) {
        const parsedData: PickupData = JSON.parse(data);
        setPickupData(parsedData);
        const foundItem = getItemById(parsedData.itemId);
        if (foundItem) {
          setItem(foundItem);
        } else {
          // Item not found, redirect with error
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not find the selected recyclable item.',
          });
          router.replace('/');
        }
      } else {
        // Handle case where data is not in session storage
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'No pickup data found. Please try again.',
          });
        router.replace('/'); 
      }
    } catch (error) {
        console.error('Failed to load pickup data:', error);
        toast({
            variant: 'destructive',
            title: 'An Unexpected Error Occurred',
            description: 'There was a problem loading your pickup details. Please try again.',
        });
        router.replace('/');
    } finally {
        setIsLoading(false);
    }
  }, [router, toast]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!item || !pickupData) {
    // This will be caught by the useEffect, but as a fallback:
    return notFound();
  }

  const { weight, imageUrl } = pickupData;
  const displayImage = imageUrl || item.image;
  const estimatedPoints = (item.pricePerKg * weight).toFixed(2);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      console.log('Confirming pickup for:', { item, pickupData });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear session storage on success
      sessionStorage.removeItem('pickupData');
      
      console.log('Pickup confirmed successfully.');
      const title = encodeURIComponent("Pickup Scheduled!");
      const message = encodeURIComponent("Your request has been confirmed. The driver is on their way.");
      const redirectUrl = encodeURIComponent("/");
      router.push(`/success?title=${title}&message=${message}&redirectUrl=${redirectUrl}`);

    } catch (error) {
      console.error('Failed to confirm pickup:', error);
      toast({
        variant: 'destructive',
        title: 'Confirmation Failed',
        description: 'We could not schedule your pickup. Please try again.',
      });
      setIsConfirming(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Confirm Pickup" />

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        
        <section className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {displayImage && <Image src={displayImage} alt={item.name} fill style={{objectFit: "cover"}} />}
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-primary font-semibold">{weight} kg</p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
                <p className="font-medium">Estimated Earnings</p>
                <p className="text-xl font-bold text-primary">${estimatedPoints}</p>
            </div>
        </section>
        
        <section className="bg-card p-4 rounded-lg border">
             <h3 className="font-bold mb-3">Pickup Details</h3>
             <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Pickup Address</p>
                        <p className="text-muted-foreground text-sm">Jl. Merdeka No. 1, Gambir, Jakarta Pusat, DKI Jakarta</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0">
                        <Link href="/profile/edit">
                            <Edit2 className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                 <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Pickup Schedule</p>
                        <p className="text-muted-foreground text-sm">Today, 2:00 PM - 4:00 PM</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0">
                        <Edit2 className="h-4 w-4" />
                    </Button>
                </div>
             </div>
        </section>

         <section className="bg-card p-4 rounded-lg border">
             <h3 className="font-bold mb-3">Notes for Driver (Optional)</h3>
            <Textarea 
                placeholder="e.g., The items are behind the gate." 
                className="w-full h-24 p-2 border rounded-md bg-transparent focus:ring-primary focus:outline-none"
            />
        </section>
        
        <Button size="lg" className="w-full" onClick={handleConfirm} disabled={isConfirming}>
            {isConfirming ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
            </>
            ) : 'Confirm & Schedule Pickup'}
        </Button>

      </main>
    </div>
  );
}


export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <ConfirmationContent />
        </Suspense>
    )
}
