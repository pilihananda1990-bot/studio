
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Share2, CheckCircle, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { REFERRAL_CODE } from '@/lib/constants';

const invitationHistory = [
  { name: 'John Doe', date: '2024-05-20', status: 'Successful' },
  { name: 'Jane Smith', date: '2024-05-18', status: 'Successful' },
  { name: 'Mike Johnson', date: '2024-05-15', status: 'Pending Verification' },
];

export default function ReferralPage() {
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    toast({
      title: 'Copied!',
      description: 'Referral code copied to clipboard.',
    });
  };

  const shareFallback = () => {
    handleCopy();
    toast({
      title: 'Sharing not available',
      description: 'Referral code has been copied to your clipboard instead.',
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join me on EcoCollect!',
      text: `Join me on EcoCollect and let's make a difference! Use my referral code: ${REFERRAL_CODE}`,
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
        // Fallback if sharing is programmatically denied
        shareFallback();
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      shareFallback();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="relative w-full h-48 mb-4">
             <Image 
                src="https://picsum.photos/seed/referral/800/300"
                alt="Refer a friend illustration"
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint="people community environment"
            />
          </div>
          <CardTitle className="text-2xl">Invite Friends, Earn Points!</CardTitle>
          <CardDescription>Share your code with friends. You both get bonus points when they join.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full max-w-sm">
            <p className="text-center text-sm text-muted-foreground mb-2">Your unique referral code</p>
            <div className="flex items-center gap-2">
              <Input 
                readOnly 
                value={REFERRAL_CODE} 
                className="text-center font-bold text-lg tracking-wider h-12"
              />
              <Button size="icon" variant="outline" onClick={handleCopy} aria-label="Copy code">
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button size="lg" className="w-full max-w-sm" onClick={handleShare}>
            <Share2 className="mr-2 h-5 w-5" />
            Share Your Code
          </Button>

          <Separator className="my-4 w-full" />
          
          <div className="w-full text-left">
            <h3 className="text-lg font-semibold mb-4">Invitation History</h3>
             <div className="space-y-4">
              {invitationHistory.map((invite, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium">{invite.name}</p>
                    <p className="text-sm text-muted-foreground">Invited on {new Date(invite.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-medium ${invite.status === 'Successful' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {invite.status === 'Successful' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    <span>{invite.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
