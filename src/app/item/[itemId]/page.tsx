
'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getItemById } from '@/lib/data/items';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Weight } from 'lucide-react';

type Props = {
  params: Promise<{ itemId: string }>;
};

export default function ItemDetailPage({ params }: Props) {
  const { itemId } = use(params);
  const item = getItemById(itemId);
  const [weight, setWeight] = useState(5); // Default weight 5kg

  if (!item) {
    notFound();
  }
  
  const estimatedPoints = (item.pricePerKg * weight).toFixed(2);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Button asChild variant="ghost" className="mb-4">
          <Link href={`/category/${item.categoryId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {item.categoryId.charAt(0).toUpperCase() + item.categoryId.slice(1)}
          </Link>
        </Button>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
            <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px]">
               <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover md:rounded-l-lg"
                data-ai-hint={item.dataAiHint}
              />
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <CardHeader className="p-0">
                  <CardTitle className="text-3xl lg:text-4xl">{item.name}</CardTitle>
                  <CardDescription className="pt-4 text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                  <div className="grid gap-6">
                     <div>
                       <h3 className="text-lg font-medium">Estimated Weight</h3>
                       <div className="flex items-center gap-4 mt-2">
                         <Weight className="h-6 w-6 text-muted-foreground" />
                         <Slider
                           defaultValue={[weight]}
                           max={50}
                           min={1}
                           step={1}
                           onValueChange={(value) => setWeight(value[0])}
                         />
                         <span className="font-bold text-lg w-24 text-center">{weight} kg</span>
                       </div>
                       <p className="text-sm text-muted-foreground mt-1">Adjust the slider to estimate the weight of your items.</p>
                     </div>
                     <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Price / kg</h3>
                        <p className="text-2xl font-bold text-primary">${item.pricePerKg.toFixed(2)}</p>
                     </div>
                     <div className="flex justify-between items-center bg-accent/50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Estimated Points</h3>
                        <p className="text-2xl font-bold text-accent-foreground">${estimatedPoints}</p>
                     </div>
                  </div>
                </CardContent>
              </div>
              <CardFooter className="p-0 mt-8">
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Link href={`/confirmation?itemId=${item.id}&weight=${weight}`}>Schedule Pickup</Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
