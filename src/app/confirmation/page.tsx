
'use client';

import { Suspense, useRef, useState } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { getItemById } from '@/lib/data/recyclables';
import { PageHeader } from '@/components/app/page-header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Edit2, Loader2, Camera } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const itemId = searchParams.get('itemId');
  const weight = searchParams.get('weight');
  const imageUrl = searchParams.get('imageUrl');
  
  const [isConfirming, setIsConfirming] = useState(false);
  
  const item = getItemById(itemId);
  
  if (!item || !weight) {
    return notFound();
  }

  const displayImage = imageUrl ? decodeURIComponent(imageUrl) : item.image;
  const estimatedPoints = (item.pricePerKg * parseFloat(weight)).toFixed(2);

  const handleConfirm = async () => {
    setIsConfirming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConfirming(false);
    router.push('/confirmation/success');
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Confirm Pickup" />

      <main className="flex-1 overflow-y-auto p-4 space-y-6 mb-20">
        
        <section className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image src={displayImage} alt={item.name} fill objectFit="cover" />
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

      </main>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Button size="lg" className="w-full" onClick={handleConfirm} disabled={isConfirming}>
            {isConfirming ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
            </>
            ) : 'Confirm & Schedule Pickup'}
        </Button>
      </div>
    </div>
  );
}


export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationContent />
        </Suspense>
    )
}
