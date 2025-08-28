
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { recyclableItems } from '@/lib/data/recyclables';
import { categories } from '@/lib/data/categories';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PromoBanner } from '@/components/app/promo-banner';
import { QuickAccessPanel } from '@/components/app/quick-access-panel';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? recyclableItems
    : recyclableItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex w-full flex-col">
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://i.pravatar.cc/150?u=jobayer" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back 👋</p>
              <h2 className="font-bold text-lg">Jobayer Mahbub</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-11 w-11 border-gray-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-2 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4">
        <PromoBanner />
        
        <QuickAccessPanel />

        <section className="mt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Categories</h3>
                <Link href="#" className="text-sm font-semibold text-primary">See All</Link>
            </div>
             <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {categories.map((category) => {
                    const isActive = activeCategory === category.name;
                    return (
                        <div key={category.id} 
                             className={cn(
                                "flex flex-shrink-0 items-center justify-center px-4 h-10 rounded-full shadow-sm cursor-pointer border",
                                isActive 
                                    ? "bg-primary text-primary-foreground border-primary" 
                                    : "bg-card text-card-foreground hover:bg-muted"
                             )}
                             onClick={() => setActiveCategory(category.name)}>
                            <p className="text-sm font-semibold text-center">{category.name}</p>
                        </div>
                    );
                })}
            </div>
        </section>
        
        <section className="mt-4 -mx-2">
            <div className="grid grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                     <Link href={`/items/${item.id}`} key={item.id} className="block">
                        <div className="rounded-2xl overflow-hidden bg-card border">
                            <div className="relative h-40 w-full">
                                <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" data-ai-hint={`${item.category} recycling`} />
                            </div>
                            <div className="p-3">
                                <h4 className="font-bold text-lg truncate">{item.name}</h4>
                                <p className="text-sm text-primary font-semibold mt-1">${item.pricePerKg.toFixed(2)}/kg</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
}
