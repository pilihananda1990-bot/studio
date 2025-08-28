
import React from 'react';
import { notFound } from 'next/navigation';
import { getItemById } from '@/lib/data/recyclables';
import { PageHeader } from '@/components/app/page-header';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ItemDetailClient } from '@/components/app/item-detail-client';

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);

  if (!item) {
    notFound();
  }

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
        
        <div className="p-4 space-y-6">

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
            
            <ItemDetailClient item={item} />
            
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
      </main>
    </div>
  );
}
