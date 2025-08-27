
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, KeyRound } from 'lucide-react';

// Schemas for each step
const stepOneSchema = z.object({}); // No fields needed for the initial step

const stepTwoSchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: 'Code must be 6 digits.' })
    .max(6, { message: 'Code must be 6 digits.' }),
});

const stepThreeSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required.' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmNewPassword: z
      .string()
      .min(8, { message: 'Please confirm your new password.' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match.",
    path: ['confirmNewPassword'],
  });

type Step = 1 | 2 | 3 | 4; // 1: Initial, 2: Verify Code, 3: Change Password, 4: Success

export function ChangePasswordFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formStep1 = useForm();
  const formStep2 = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
  });
  const formStep3 = useForm<z.infer<typeof stepThreeSchema>>({
    resolver: zodResolver(stepThreeSchema),
  });

  const handleStep1Submit = async () => {
    setIsSubmitting(true);
    // Simulate sending a verification code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: 'Verification Code Sent',
      description: 'A 6-digit code has been sent to your registered device.',
    });
    setIsSubmitting(false);
    setCurrentStep(2);
  };

  const handleStep2Submit = async (values: z.infer<typeof stepTwoSchema>) => {
    setIsSubmitting(true);
    // Simulate verifying the code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (values.verificationCode !== '123456') {
       toast({
        variant: 'destructive',
        title: 'Invalid Code',
        description: 'The verification code is incorrect. Please try again.',
      });
    } else {
       toast({
        title: 'Verification Successful',
        description: 'You can now change your password.',
      });
      setCurrentStep(3);
    }
    setIsSubmitting(false);
  };

  const handleStep3Submit = async (values: z.infer<typeof stepThreeSchema>) => {
    setIsSubmitting(true);
     // Simulate changing the password
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Password change data:', values);
     toast({
      title: 'Password Changed Successfully',
      description: 'Your password has been updated.',
    });
    setIsSubmitting(false);
    setCurrentStep(4);
  };

  const handleResetFlow = () => {
    formStep2.reset();
    formStep3.reset();
    setCurrentStep(1);
  };

  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          For your security, we need to verify your identity before you can change your password.
        </p>
        <Button onClick={handleStep1Submit} disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            <ShieldCheck className="mr-2" />
          )}
          Start Verification
        </Button>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium">Enter Verification Code</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code we sent to your device. (Hint: it's 123456)
        </p>
        <Form {...formStep2}>
          <form onSubmit={formStep2.handleSubmit(handleStep2Submit)} className="space-y-4">
            <FormField
              control={formStep2.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
               <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                Verify
              </Button>
              <Button variant="link" onClick={handleResetFlow}>Cancel</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
       <div className="space-y-4">
        <h3 className="font-medium">Set Your New Password</h3>
         <Form {...formStep3}>
          <form onSubmit={formStep3.handleSubmit(handleStep3Submit)} className="space-y-4">
             <FormField
              control={formStep3.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={formStep3.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                     <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={formStep3.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                     <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
               <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                Save New Password
              </Button>
               <Button variant="link" onClick={handleResetFlow}>Cancel</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="space-y-4 text-center p-4 bg-green-50 rounded-lg border border-green-200">
        <KeyRound className="h-12 w-12 text-green-600 mx-auto"/>
        <h3 className="text-lg font-bold text-green-800">Password Changed!</h3>
        <p className="text-sm text-green-700">
          Your password has been successfully updated.
        </p>
        <Button onClick={handleResetFlow}>Start Over</Button>
      </div>
    );
  }

  return null;
}
