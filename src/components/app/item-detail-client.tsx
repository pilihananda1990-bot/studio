
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RecyclableItem } from '@/lib/types';
import React from 'react';

export function ItemDetailClient({ item }: { item: RecyclableItem }) {
  const [weight, setWeight] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const handleSchedulePickup = () => {
    if (!item || !weight || weight <= 0) return;

    const pickupData = {
      itemId: item.id,
      weight: weight,
      imageUrl: uploadedImage,
    };

    sessionStorage.setItem('pickupData', JSON.stringify(pickupData));
    router.push('/confirmation');
  };

  const estimatedEarnings = (item.pricePerKg * weight).toFixed(2);

  return (
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
          <Button size="lg" className="w-full mt-4" disabled={!weight || weight <= 0} onClick={handleSchedulePickup}>
            Schedule Pickup
        </Button>
    </section>
  );
}
