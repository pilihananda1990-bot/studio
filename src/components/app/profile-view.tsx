
'use client';

import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Shield,
  User,
  Wallet,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const menuItems = [
  { icon: Wallet, label: 'Wallet', href: '#' },
  { icon: User, label: 'Referral', href: '#' },
  { icon: Shield, label: 'Security', href: '#' },
  { icon: HelpCircle, label: 'Help & Feedback', href: '#' },
];

export function ProfileView() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://i.pravatar.cc/150?u=profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Eco-Warrior</h2>
              <p className="text-muted-foreground">@ecowarrior</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Edit Profile
            </Button>
          </div>

          <div className="mt-8 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </a>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="#"
              className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <LogOut className="h-6 w-6 text-destructive" />
                <span className="font-medium text-destructive">Logout</span>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
