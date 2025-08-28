
'use client';

import {
  User,
  Heart,
  Settings,
  HelpCircle,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
  Gift,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { icon: User, label: 'Edit Profile', href: '/profile/edit' },
  { icon: Gift, label: 'My Wallet', href: '/profile/wallet' },
  { icon: Users, label: 'Refer a Friend', href: '/profile/referral' },
  { icon: Settings, label: 'Settings', href: '/profile/settings' },
  { icon: Shield, label: 'Security', href: '/profile/security' },
  { icon: HelpCircle, label: 'Help & Feedback', href: '/profile/help' },
  { icon: FileText, label: 'Terms & Conditions', href: '/profile/terms' },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
          <AvatarImage src="https://i.pravatar.cc/150?u=jobayer" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">Jobayer Mahbub</h1>
        <p className="text-muted-foreground">eco.warrior@example.com</p>
      </div>

      <Separator className="my-8" />
      
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <div key={item.label}>
             <Link
              href={item.href}
              className="flex items-center justify-between p-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors"
              prefetch={true}
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-6 w-6 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            {index < menuItems.length && <Separator />}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
