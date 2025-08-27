
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategoryById } from '@/lib/data/categories';
import { getItemsByCategoryId } from '@/lib/data/items';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: { categoryId: string };
};

export default function CategoryPage({ params: { categoryId } }: Props) {
  const category = getCategoryById(categoryId);
  const items = getItemsByCategoryId(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
          <div className="flex items-center gap-4">
             <div className="rounded-full bg-primary/20 p-3 text-primary">
                <category.icon className="h-8 w-8" />
             </div>
             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{category.name} Items</h1>
          </div>
          <p className="text-muted-foreground mt-2">Select an item to view details and schedule a pickup.</p>
        </div>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id}>
                <Link href={`/item/${item.id}`} className="group block">
                   <div className="flex items-start gap-4 rounded-lg p-2 -ml-2 transition-colors hover:bg-muted/50">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          data-ai-hint={item.dataAiHint}
                          sizes="100px"
                        />
                      </div>
                      <div className="flex-grow pt-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-1">{item.description}</p>
                      </div>
                   </div>
                </Link>
                {index < items.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
