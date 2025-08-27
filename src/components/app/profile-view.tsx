
'use client';

import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Shield,
  User,
  Wallet,
  Settings,
  FileText,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

const menuItems = [
  { icon: Wallet, label: 'Wallet', href: '/profile/wallet' },
  { icon: User, label: 'Referral', href: '/profile/referral' },
  { icon: Settings, label: 'Settings', href: '/profile/settings' },
  { icon: Shield, label: 'Security', href: '/profile/security' },
  { icon: HelpCircle, label: 'Help & Feedback', href: '/profile/help' },
  { icon: FileText, label: 'Terms & Conditions', href: '/profile/terms' },
];

export function ProfileView() {
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, you would handle logout logic here.
    console.log('User logged out');
    setIsLogoutAlertOpen(false);
    // router.push('/login');
  };

  return (
    <>
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
              <Button asChild variant="outline" className="ml-auto">
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
            </div>

            <div className="mt-8 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="h-6 w-6 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <AlertDialog open={isLogoutAlertOpen} onOpenChange={setIsLogoutAlertOpen}>
                <AlertDialogTrigger asChild>
                   <button className="flex w-full items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors text-destructive">
                    <div className="flex items-center gap-4">
                      <LogOut className="h-6 w-6" />
                      <span className="font-medium">Logout</span>
                    </div>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the login screen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
