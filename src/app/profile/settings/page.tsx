
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/components/app/theme-provider';
import { Sun, Moon, Laptop } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications from us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="reward-notifications">Reward Notifications</Label>
              <Switch id="reward-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>
              Choose how you want the application to look.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <Label htmlFor="light" className="p-4 border rounded-lg cursor-pointer flex flex-col items-center gap-2 [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Sun className="h-8 w-8" />
                <span>Light</span>
              </Label>
              <Label htmlFor="dark" className="p-4 border rounded-lg cursor-pointer flex flex-col items-center gap-2 [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Moon className="h-8 w-8" />
                <span>Dark</span>
              </Label>
              <Label htmlFor="system" className="p-4 border rounded-lg cursor-pointer flex flex-col items-center gap-2 [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <Laptop className="h-8 w-8" />
                <span>System</span>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
