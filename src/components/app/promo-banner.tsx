
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay";

const banners = [
  {
    title: 'Recycle & Earn Points',
    description: 'Get rewarded for saving the planet.',
    imageUrl: 'https://picsum.photos/seed/carousel-1/800/400',
    aiHint: 'recycling environment',
    href: '#',
    cta: 'Learn More',
  },
  {
    title: 'New Organic Composting',
    description: 'Turn your food scraps into valuable compost.',
    imageUrl: 'https://picsum.photos/seed/carousel-2/800/400',
    aiHint: 'compost organic food',
    href: '#',
    cta: 'Get Started',
  },
  {
    title: 'Community Challenge',
    description: 'Join the challenge and win exclusive prizes.',
    imageUrl: 'https://picsum.photos/seed/carousel-3/800/400',
    aiHint: 'community prize recycling',
    href: '#',
    cta: 'Join Now',
  },
];

export function PromoBanner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel 
        setApi={setApi}
        plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
        ]}
        opts={{
            loop: true,
        }}
        >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative rounded-2xl bg-gradient-to-r from-green-600 to-green-800 text-white p-6 overflow-hidden h-40 flex flex-col justify-center">
                <div className="relative z-10 w-3/5">
                  <h1 className="text-xl font-bold">{banner.title}</h1>
                  <p className="text-xs mt-1">{banner.description}</p>
                  <Link href={banner.href} passHref>
                    <Button className="mt-4 bg-primary rounded-full h-8 px-4 text-sm hover:bg-primary/90">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
                <div className="absolute right-0 top-0 h-full w-2/5 opacity-40">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    data-ai-hint={banner.aiHint}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
       <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
            <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                    'h-1.5 w-1.5 rounded-full transition-all',
                    current === i + 1 ? 'w-4 bg-primary' : 'bg-white/50'
                )}
            />
        ))}
      </div>
    </div>
  );
}
