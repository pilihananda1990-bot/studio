
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getItemById } from '@/lib/data/items';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ItemInteraction } from '@/components/app/item-interaction';

type Props = {
  params: { itemId: string };
};

// Note: This is now a Server Component to allow for `React.use(params)`.
export default function ItemDetailPage({ params }: Props) {
  // MANDATE: Use React.use() to access the params object
  const unwrappedParams = React.use(params);
  const itemId = unwrappedParams.itemId;
  
  const item = getItemById(itemId);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={item.dataAiHint}
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <Button asChild variant="ghost" className="mb-4 -ml-4">
              <Link href={`/category/${item.categoryId}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to {item.categoryId.charAt(0).toUpperCase() + item.categoryId.slice(1)}
              </Link>
            </Button>
            
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">{item.name}</h1>
                <p className="pt-4 text-base text-muted-foreground">{item.description}</p>
              </div>

              <Separator className="my-4" />
              
              {/* Client-side components are now isolated */}
              <ItemInteraction item={item} />
            </div>
        </div>
      </main>
    </div>
  );
}
