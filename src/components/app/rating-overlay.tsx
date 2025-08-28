
'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { usePickup } from '@/context/pickup-context';

type RatingOverlayProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function RatingOverlay({ isOpen, onOpenChange }: RatingOverlayProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { completePickup } = usePickup();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        variant: 'destructive',
        title: 'Please select a rating',
        description: 'You must select at least one star to submit your feedback.',
      });
      return;
    }
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log({ rating, comment });
    
    toast({
      title: 'Feedback Submitted!',
      description: 'Thank you for helping us improve our service.',
    });

    setIsSubmitting(false);
    onOpenChange(false);
    completePickup();
    
    setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setComment('');
    }, 500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader className="text-center mb-6">
          <SheetTitle>Rate Your Driver</SheetTitle>
          <SheetDescription>Your feedback helps us improve our service.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'w-10 h-10 cursor-pointer transition-colors',
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-muted-foreground/50'
                )}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Add a comment... (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={isSubmitting} size="lg" className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
