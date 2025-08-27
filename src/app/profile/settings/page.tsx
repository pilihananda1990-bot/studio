
'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 max-w-2xl mx-auto">
        <section>
          <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
          <p className="text-muted-foreground mb-6">
            Manage how you receive notifications from us.
          </p>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="font-normal">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
             <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="font-normal">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
             <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="reward-notifications" className="font-normal">Reward Notifications</Label>
              <Switch id="reward-notifications" defaultChecked />
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold mb-2">Theme Settings</h2>
          <p className="text-muted-foreground mb-6">
            Choose how you want the application to look.
          </p>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
          </RadioGroup>
        </section>
      </div>
    </div>
  );
}
