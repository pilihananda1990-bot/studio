
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Loader2, KeyRound, Mail, Smartphone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from './page-header';

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: 'Code must be 6 digits.' })
    .max(6, { message: 'Code must be 6 digits.' }),
});

const changePasswordSchema = z
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

type Step = 'selection' | 'verification' | 'change_password' | 'success';
type OtpMethod = 'email' | 'sms' | null;

export function ChangePasswordFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [otpMethod, setOtpMethod] = useState<OtpMethod>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: '',
    },
  });
  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleMethodSelection = async (method: OtpMethod) => {
    setIsSubmitting(true);
    setOtpMethod(method);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: 'Verification Code Sent',
      description: `A 6-digit code has been sent to your registered ${method}.`,
    });
    setIsSubmitting(false);
    setCurrentStep('verification');
  };

  const handleVerificationSubmit = async (values: z.infer<typeof verificationSchema>) => {
    setIsSubmitting(true);
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
      setCurrentStep('change_password');
    }
    setIsSubmitting(false);
    verificationForm.reset();
  };

  const handleChangePasswordSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Password change data:', values);
    toast({
      title: 'Password Changed Successfully',
      description: 'Your password has been updated.',
    });
    setIsSubmitting(false);
    setCurrentStep('success');
    setTimeout(() => router.push('/profile/security'), 2000);
  };
  
  if (currentStep === 'selection') {
    return (
       <div>
          <PageHeader title="Change Password" backHref="/profile/security" backText="Security" />
          <div className="mt-8">
            <p className="text-muted-foreground text-center mb-6">Choose a method to verify your identity.</p>
            <div className="space-y-4">
               <Button onClick={() => handleMethodSelection('email')} disabled={isSubmitting} className="w-full justify-start">
                  {isSubmitting && otpMethod === 'email' ? <Loader2 className="mr-2 animate-spin" /> : <Mail className="mr-2" />}
                  Send OTP via Email
               </Button>
               <Button onClick={() => handleMethodSelection('sms')} disabled={isSubmitting} className="w-full justify-start">
                  {isSubmitting && otpMethod === 'sms' ? <Loader2 className="mr-2 animate-spin" /> : <Smartphone className="mr-2" />}
                  Send OTP via SMS
               </Button>
            </div>
          </div>
        </div>
    );
  }

  if (currentStep === 'verification') {
    return (
      <div>
        <PageHeader title="Enter Verification Code" backHref="/profile/security" backText="Security" />
         <div className="mt-8">
            <p className="text-muted-foreground text-center mb-6">{`Enter the 6-digit code we sent to your ${otpMethod}. (Hint: it's 123456)`}</p>
            <Form {...verificationForm}>
              <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-4">
                <FormField
                  control={verificationForm.control}
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
                <div className="flex gap-2 items-center">
                   <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                    Verify
                  </Button>
                   <Button variant="ghost" onClick={() => setCurrentStep('selection')}>
                    Back
                  </Button>
                </div>
              </form>
            </Form>
        </div>
      </div>
    );
  }

  if (currentStep === 'change_password') {
    return (
       <div>
        <PageHeader title="Set New Password" backHref="/profile/security" backText="Security" />
        <div className="mt-8">
            <p className="text-muted-foreground text-center mb-6">Please enter your current and new passwords.</p>
             <Form {...changePasswordForm}>
              <form onSubmit={changePasswordForm.handleSubmit(handleChangePasswordSubmit)} className="space-y-4">
                 <FormField
                  control={changePasswordForm.control}
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
                  control={changePasswordForm.control}
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
                  control={changePasswordForm.control}
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
                   <Button variant="ghost" onClick={() => setCurrentStep('verification')}>
                    Back
                  </Button>
                </div>
              </form>
            </Form>
        </div>
       </div>
    );
  }

  if (currentStep === 'success') {
    return (
      <div className="p-6 space-y-4 text-center border rounded-lg">
            <KeyRound className="h-12 w-12 text-green-600 mx-auto"/>
            <h3 className="text-lg font-bold">Password Changed!</h3>
            <p className="text-sm text-muted-foreground">
              Your password has been successfully updated. Redirecting...
            </p>
      </div>
    );
  }

  return null;
}
