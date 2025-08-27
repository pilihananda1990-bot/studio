import { categories } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Recycle with Ease
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            Select a category to see what items you can recycle and schedule a
            pickup today.
          </p>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                href={`/category/${category.id}`}
                key={category.id}
                className="group"
              >
                <Card className="h-full transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-xl bg-card">
                  <CardHeader className="flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <div className="rounded-full bg-primary/20 p-4 text-primary">
                      <category.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {category.name}
                    </CardTitle>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        EcoCollect &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
