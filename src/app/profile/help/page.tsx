
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, Mail, MessageCircle, Paperclip, Loader2 } from 'lucide-react';

const faqItems = [
  {
    question: "How do I earn points?",
    answer: "You earn points for every kilogram of recyclable material you schedule for pickup through our app. The amount of points varies by material type. Check the item details for specific rates.",
  },
  {
    question: "How do I schedule a pickup?",
    answer: "From the home screen, select a category, then choose an item. On the item page, estimate the weight and click 'Schedule Pickup'. Finally, confirm your address and pickup time.",
  },
  {
    question: "My points were not updated. What should I do?",
    answer: "Points are typically updated within 24 hours of a successful pickup. If your points still haven't appeared after this period, please contact our support team using one of the options below.",
  },
];

const feedbackFormSchema = z.object({
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
});

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      subject: '',
      description: '',
    },
  });

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmailSupport = () => {
    window.location.href = 'mailto:support@ecocollect.com';
  };
  
  const handleWhatsAppSupport = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = '1234567890'; 
    const message = encodeURIComponent("Hi, I need help with my EcoCollect account.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  async function onSubmit(values: z.infer<typeof feedbackFormSchema>) {
    setIsSubmitting(true);
    console.log('Feedback submitted:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Feedback Submitted!',
      description: 'Thank you for your feedback. We will get back to you soon.',
    });

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Help & Feedback</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to your questions or get in touch with our support team.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No matching FAQs found.</p>
              )}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Still need help? Reach out to us.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Button variant="outline" onClick={handleEmailSupport}>
                <Mail className="mr-2"/> Email Support
             </Button>
             <Button variant="outline" onClick={handleWhatsAppSupport}>
                <MessageCircle className="mr-2"/> WhatsApp Support
             </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback or Report a Bug</CardTitle>
            <CardDescription>We value your input. Let us know how we can improve.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pickup button not working" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the issue in detail..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormItem>
                    <FormLabel>Attachment (Optional)</FormLabel>
                    <FormControl>
                        <Button variant="outline" className="w-full" asChild>
                            <label htmlFor="file-upload">
                                <Paperclip className="mr-2"/> Attach a screenshot or file
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                        </Button>
                    </FormControl>
                 </FormItem>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
