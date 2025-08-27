
'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getItemById } from '@/lib/data/items';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Landmark, Loader2, MapPin, User } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  street: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  zipCode: z.string().min(5, { message: "A valid zip code is required." }),
});

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const itemId = searchParams.get('itemId');
  const weight = searchParams.get('weight');

  if (!itemId || !weight) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p className="text-destructive">Missing item information.</p>
        <Button asChild variant="link" className="mt-4"><Link href="/">Go Home</Link></Button>
      </div>
    );
  }

  const item = getItemById(itemId);
  if (!item) {
     return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p className="text-destructive">Item not found.</p>
        <Button asChild variant="link" className="mt-4"><Link href="/">Go Home</Link></Button>
      </div>
    );
  }

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      street: "",
      city: "",
      zipCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Scheduling pickup for:", {
        itemId: item?.id,
        weight,
        address: values,
      });
      
      router.push('/completion');
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem scheduling your pickup. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const estimatedPoints = (item.pricePerKg * parseFloat(weight)).toFixed(2);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href={`/item/${item.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Item
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold">Confirm Your Pickup</h1>
            <p className="text-muted-foreground mt-1">Please review the details and provide your pickup address.</p>
           
           <Separator className="my-6" />

            <div className="grid gap-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Item Summary</h3>
                <div className="flex justify-between items-center">
                  <span>Item:</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Estimated Weight:</span>
                  <span className="font-medium">{weight} kg</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Estimated Points:</span>
                  <span className="font-bold text-primary">${estimatedPoints}</span>
                </div>
              </div>

              <div>
                 <h3 className="font-semibold mb-4">Pickup Address</h3>
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField control={form.control} name="fullName" render={({ field }) => (
                         <FormItem>
                           <FormLabel>Full Name</FormLabel>
                           <FormControl>
                             <div className="relative">
                               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                               <Input placeholder="John Doe" {...field} className="pl-10" />
                             </div>
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField control={form.control} name="street" render={({ field }) => (
                         <FormItem>
                           <FormLabel>Street Address</FormLabel>
                           <FormControl>
                             <div className="relative">
                               <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                               <Input placeholder="123 Eco Lane" {...field} className="pl-10" />
                             </div>
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="city" render={({ field }) => (
                           <FormItem>
                             <FormLabel>City</FormLabel>
                             <FormControl>
                               <div className="relative">
                                 <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                 <Input placeholder="Greenville" {...field} className="pl-10" />
                               </div>
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField control={form.control} name="zipCode" render={({ field }) => (
                           <FormItem>
                             <FormLabel>ZIP Code</FormLabel>
                             <FormControl>
                               <div className="relative">
                                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                 <Input placeholder="12345" {...field} className="pl-10" />
                               </div>
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     </div>
                     <Button type="submit" size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          'Confirm Pickup Request'
                        )}
                     </Button>
                   </form>
                 </Form>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
