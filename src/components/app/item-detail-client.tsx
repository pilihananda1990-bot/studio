
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RecyclableItem } from '@/lib/types';
import React from 'react';
import { useToast } from '@/hooks/use-toast';

export function ItemDetailClient({ item }: { item: RecyclableItem }) {
  const [weight, setWeight] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'Image Too Large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.onerror = () => {
        toast({
          variant: 'destructive',
          title: 'Error Reading File',
          description: 'There was a problem uploading your image. Please try again.',
        });
      }
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSchedulePickup = () => {
    if (!item || !weight || weight <= 0) return;
    setIsSubmitting(true);
    
    try {
      const pickupData = {
        itemId: item.id,
        weight: weight,
        imageUrl: uploadedImage,
      };

      console.log("Saving pickup data to sessionStorage:", pickupData);
      sessionStorage.setItem('pickupData', JSON.stringify(pickupData));

      console.log("Navigating to /confirmation");
      router.push('/confirmation');
    } catch (error) {
       console.error("Failed to schedule pickup:", error);
       toast({
          variant: 'destructive',
          title: 'An Unexpected Error Occurred',
          description: 'Could not schedule pickup. Please try again later.',
       });
       setIsSubmitting(false);
    }
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
                    aria-hidden="true"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-14 w-14 rounded-lg relative" 
                    onClick={triggerFileUpload}
                    aria-label="Upload an image of your items"
                  >
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
                    step="0.1"
                    min="0"
                />
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-xs text-muted-foreground">Earnings</p>
                <p className="text-lg font-bold text-primary">${estimatedEarnings}</p>
            </div>
        </div>
          <Button size="lg" className="w-full mt-4" disabled={isSubmitting || weight <= 0} onClick={handleSchedulePickup}>
             {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : 'Schedule Pickup'}
        </Button>
    </section>
  );
}
