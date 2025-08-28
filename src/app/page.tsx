
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { pets as allPets } from '@/lib/data/pets';
import { categories } from '@/lib/data/categories';
import { cn } from '@/lib/utils';
import Link from 'next/link';


export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPets = activeCategory === 'All' 
    ? allPets 
    : allPets.filter(pet => pet.category.toLowerCase() === activeCategory.toLowerCase());

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
            <Button variant="outline" size="icon" className="rounded-full h-11 w-11 border-gray-200">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-11 w-11 border-gray-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-2 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 mt-4">
        <section className="relative rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-2xl font-bold">Find Your Perfect Pet</h1>
                <p className="text-sm mt-1">40% Off on Pet Products</p>
                <Link href="#" passHref>
                  <Button className="mt-4 bg-primary rounded-full h-10 px-5 text-base hover:bg-primary/90">
                      Shop Now
                  </Button>
                </Link>
            </div>
            <div className="absolute right-0 bottom-0">
                 <Image 
                    src="https://picsum.photos/seed/pet-promo/200/200"
                    width={160}
                    height={160}
                    alt="Woman with dog"
                    className="object-contain"
                    data-ai-hint="woman dog"
                />
            </div>
        </section>

        <section className="mt-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Categories</h3>
                <Link href="#" className="text-sm font-semibold text-primary">See All</Link>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col items-center gap-2 flex-shrink-0" onClick={() => setActiveCategory(category.name)}>
                        <div className={cn(
                            "h-16 w-16 rounded-full flex items-center justify-center transition-all cursor-pointer",
                            activeCategory === category.name ? 'bg-primary/20 border-2 border-primary' : 'bg-secondary'
                        )}>
                            <p className="text-3xl">{category.icon}</p>
                        </div>
                        <p className="text-sm font-semibold">{category.name}</p>
                    </div>
                ))}
            </div>
        </section>
        
        <section className="mt-6 -mx-2">
            <div className="grid grid-cols-2 gap-4">
                {filteredPets.map((pet) => (
                    <Link href="#" key={pet.id} className="block">
                        <div className="rounded-2xl overflow-hidden relative">
                            <div className="relative h-48 w-full" style={{ backgroundColor: pet.backgroundColor }}>
                                <Image src={pet.image} alt={pet.name} layout="fill" objectFit="cover" data-ai-hint={`${pet.category} portrait`} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/20 text-white">
                                <h4 className="font-bold text-lg">{pet.name}</h4>
                                <div className="flex gap-2 mt-1">
                                    <div className="text-xs font-semibold bg-white/30 rounded-full px-3 py-1">{pet.sex}</div>
                                    <div className="text-xs font-semibold bg-white/30 rounded-full px-3 py-1">{pet.age}</div>
                                </div>
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
