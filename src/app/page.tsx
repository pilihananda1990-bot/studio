
import { categories } from '@/lib/data/categories';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <section className="text-center">
           <div className="flex items-center justify-center gap-2 mb-4">
             <p className="text-sm md:text-base text-primary font-semibold">Hello, Eco-Warrior!</p>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Recycle with Ease
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            Select a category to see what items you can recycle and schedule a
            pickup today.
          </p>
        </section>

        <section className="mt-12">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="group"
                >
                  <div className="p-4 -mx-4 rounded-lg flex items-center gap-4 transition-colors hover:bg-muted/50">
                      <div className="rounded-full bg-primary/20 p-3 text-primary">
                        <category.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold">
                          {category.name}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
                {index < categories.length - 1 && <Separator />}
              </div>
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
