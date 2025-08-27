
'use client';

import { ChangePasswordFlow } from '@/components/app/change-password-flow';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your password and account security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordFlow />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
             <CardDescription>
              This is a list of devices that have logged into your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
           <p className="text-sm text-muted-foreground">Account activity details will be shown here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
