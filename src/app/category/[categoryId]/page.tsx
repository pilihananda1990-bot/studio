import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategoryById, getItemsByCategoryId } from '@/lib/data';
import { AppHeader } from '@/components/app/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: { categoryId: string };
};

export default function CategoryPage({ params }: Props) {
  const category = getCategoryById(params.categoryId);
  const items = getItemsByCategoryId(params.categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <Link href={`/item/${item.id}`} key={item.id} className="group">
                <Card className="overflow-hidden h-full flex flex-col transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-xl">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      data-ai-hint={item.dataAiHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
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
