
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getProvinces, getCities, getSubdistricts, getVillages } from '@/lib/data';
import type { City, Subdistrict, Village } from '@/lib/types';


const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email(),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  province: z.string().nonempty({ message: 'Please select a province.' }),
  city: z.string().nonempty({ message: 'Please select a city.' }),
  subdistrict: z.string().nonempty({ message: 'Please select a sub-district.' }),
  village: z.string().nonempty({ message: 'Please select a village.' }),
  fullAddress: z.string().min(10, { message: 'Full address must be at least 10 characters.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  fullName: 'Eco-Warrior',
  email: 'eco.warrior@example.com',
  phone: '123-456-7890',
  province: '31', // DKI Jakarta
  city: '3171', // Kota Jakarta Pusat
  subdistrict: '3171010', // Gambir
  village: '3171010001', // Gambir
  fullAddress: 'Jl. Merdeka No. 1',
};

export default function EditProfilePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cities, setCities] = useState<City[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const selectedProvince = form.watch('province');
  const selectedCity = form.watch('city');
  const selectedSubdistrict = form.watch('subdistrict');

  useEffect(() => {
    if (selectedProvince) {
      setCities(getCities(selectedProvince));
      form.setValue('city', '');
      form.setValue('subdistrict', '');
      form.setValue('village', '');
    } else {
      setCities([]);
    }
  }, [selectedProvince, form]);

  useEffect(() => {
    if (selectedCity) {
      setSubdistricts(getSubdistricts(selectedCity));
       form.setValue('subdistrict', '');
       form.setValue('village', '');
    } else {
      setSubdistricts([]);
    }
  }, [selectedCity, form]);

    useEffect(() => {
    if (selectedSubdistrict) {
      setVillages(getVillages(selectedSubdistrict));
      form.setValue('village', '');
    } else {
      setVillages([]);
    }
  }, [selectedSubdistrict, form]);

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    console.log(data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    form.reset(data); // Resets the form's dirty state

    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} readOnly />
                    </FormControl>
                    <FormDescription>
                      Your email address is not editable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123-456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a province" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        {getProvinces().map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/District</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={cities.length === 0}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        {cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subdistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub-district</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={subdistricts.length === 0}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a sub-district" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        {subdistricts.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                     <Select onValueChange={field.onChange} value={field.value} disabled={villages.length === 0}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a village" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        {villages.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Street Name, House Number, RT/RW"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Please provide details like street name, house number, and RT/RW.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting || !form.formState.isDirty}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
