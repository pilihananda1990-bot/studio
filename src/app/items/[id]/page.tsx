
'use client';

import { useState, useRef } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getItemById } from '@/lib/data/recyclables';
import { PageHeader } from '@/components/app/page-header';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const item = getItemById(resolvedParams.id);
  
  const [weight, setWeight] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!item) {
    notFound();
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setWeight(0);
    } else {
        const parsedWeight = parseFloat(value);
        if (!isNaN(parsedWeight) && parsedWeight >= 0) {
            setWeight(parsedWeight);
        }
    }
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const estimatedEarnings = (item.pricePerKg * weight).toFixed(2);
  const scheduleLink = `/confirmation?itemId=${item.id}&weight=${weight}${uploadedImage ? `&imageUrl=${encodeURIComponent(uploadedImage)}` : ''}`;


  return (
    <div className="flex flex-col h-full">
      <PageHeader title={item.name} />
      
      <main className="flex-1 overflow-y-auto pb-8">
        <div className="relative h-60 w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={`${item.category} recycling`}
          />
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-6">

             <section>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-300">Clean Price</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">${item.pricePerKg.toFixed(2)}<span className="text-base font-normal">/kg</span></p>
                    </div>
                     <div className="bg-orange-100 dark:bg-orange-900/50 p-4 rounded-lg">
                        <p className="text-sm text-orange-800 dark:text-orange-300">Dirty Price</p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">${item.dirtyPricePerKg.toFixed(2)}<span className="text-base font-normal">/kg</span></p>
                    </div>
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-primary p-3 bg-primary/10 rounded-lg">
                    Clean your items to get the best price!
                </p>
            </section>
            
             <section className="bg-card p-4 rounded-lg border">
                <div className="flex items-end gap-2">
                    <div className="flex-shrink-0">
                         <Input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Button variant="outline" size="icon" className="h-14 w-14 rounded-lg relative" onClick={triggerFileUpload}>
                              {uploadedImage ? (
                                <Image src={uploadedImage} alt="Uploaded item" fill className="object-cover rounded-lg" />
                              ) : (
                                <Camera className="h-7 w-7" />
                              )}
                          </Button>
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="weight-input" className="text-xs font-medium text-muted-foreground">Weight (kg)</label>
                        <Input
                            id="weight-input"
                            type="number"
                            value={weight === 0 ? '' : weight}
                            onChange={handleWeightChange}
                            className="mt-1 font-bold text-lg h-9"
                            placeholder="e.g., 5"
                        />
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-xs text-muted-foreground">Earnings</p>
                        <p className="text-lg font-bold text-primary">${estimatedEarnings}</p>
                    </div>
                </div>
                 <Button asChild size="lg" className="w-full mt-4" disabled={!weight || weight <= 0}>
                    <Link href={scheduleLink}>Schedule Pickup</Link>
                </Button>
            </section>
            
            <Separator />

            <section>
              <h2 className="text-xl font-bold">Description</h2>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-bold">How to Prepare</h2>
               <ul className="mt-2 space-y-3">
                {item.preparation.map((step, index) => (
                   <li key={index} className="flex items-start gap-3">
                     <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                       {index + 1}
                     </div>
                     <span className="flex-1 text-muted-foreground">{step}</span>
                   </li>
                 ))}
               </ul>
            </section>

            <Separator />

            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-bold flex items-center gap-2 text-green-600">
                           <CheckCircle2 /> Accepted
                        </h3>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                            {item.accepted.map(acc => <li key={acc}>{acc}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold flex items-center gap-2 text-destructive">
                           <XCircle /> Prohibited
                        </h3>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                            {item.prohibited.map(pro => <li key={pro}>{pro}</li>)}
                        </ul>
                    </div>
                </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
