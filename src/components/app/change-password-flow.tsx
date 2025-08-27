
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
import { Loader2, ShieldCheck, KeyRound, Mail, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

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

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
  });
  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleMethodSelection = async (method: OtpMethod) => {
    setIsSubmitting(true);
    setOtpMethod(method);
    // Simulate sending an OTP
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
      setCurrentStep('change_password');
    }
    setIsSubmitting(false);
  };

  const handleChangePasswordSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    setIsSubmitting(true);
    // Simulate changing the password
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Password change data:', values);
    toast({
      title: 'Password Changed Successfully',
      description: 'Your password has been updated.',
    });
    setIsSubmitting(false);
    setCurrentStep('success');
  };

  const handleResetFlow = () => {
    verificationForm.reset();
    changePasswordForm.reset();
    setOtpMethod(null);
    setCurrentStep('selection');
  };

  if (currentStep === 'selection') {
    return (
       <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Choose a method to verify your identity before changing your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button onClick={() => handleMethodSelection('email')} disabled={isSubmitting} className="w-full justify-start">
                {isSubmitting && otpMethod === 'email' ? <Loader2 className="mr-2 animate-spin" /> : <Mail className="mr-2" />}
                Send OTP via Email
             </Button>
             <Button onClick={() => handleMethodSelection('sms')} disabled={isSubmitting} className="w-full justify-start">
                {isSubmitting && otpMethod === 'sms' ? <Loader2 className="mr-2 animate-spin" /> : <Smartphone className="mr-2" />}
                Send OTP via SMS
             </Button>
          </CardContent>
        </Card>
    );
  }

  if (currentStep === 'verification') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enter Verification Code</CardTitle>
          <CardDescription>
            Enter the 6-digit code we sent to your {otpMethod}. (Hint: it's 123456)
          </CardDescription>
        </CardHeader>
         <CardContent>
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
                  <Button variant="link" onClick={handleResetFlow}>Cancel</Button>
                </div>
              </form>
            </Form>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'change_password') {
    return (
       <Card>
        <CardHeader>
            <CardTitle>Set Your New Password</CardTitle>
            <CardDescription>Please enter your current and new passwords.</CardDescription>
        </CardHeader>
        <CardContent>
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
                      <FormLabel>New Password</FormLabel>                      <FormControl>
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
                   <Button variant="link" onClick={handleResetFlow}>Cancel</Button>
                </div>
              </form>
            </Form>
        </CardContent>
       </Card>
    );
  }

  if (currentStep === 'success') {
    return (
      <div className="space-y-4 text-center p-4 bg-green-50 rounded-lg border border-green-200 dark:bg-green-950 dark:border-green-800">
        <KeyRound className="h-12 w-12 text-green-600 mx-auto"/>
        <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Password Changed!</h3>
        <p className="text-sm text-green-700 dark:text-green-400">
          Your password has been successfully updated.
        </p>
        <Button onClick={handleResetFlow}>Start Over</Button>
      </div>
    );
  }

  return null;
}
