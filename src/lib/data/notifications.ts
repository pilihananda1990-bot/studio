
import { Wallet, MapPin, Leaf } from "lucide-react";
import type { Notification } from "@/lib/types";

export const notifications: Notification[] = [
  { 
    id: 'notif-1', 
    icon: MapPin,
    title: 'Pickup Confirmed!',
    description: 'Your pickup for Plastic Bottles has been scheduled. The driver is on the way.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    href: '/map'
  },
  { 
    id: 'notif-2', 
    icon: Wallet,
    title: 'Points Redeemed',
    description: 'You successfully redeemed 5,000 points for a GoFood Voucher.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    read: false,
    href: '/profile/wallet'
  },
  { 
    id: 'notif-3', 
    icon: Leaf,
    title: 'New Eco-Challenge!',
    description: 'A new challenge is available. Recycle 10kg of paper to earn bonus points!',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    href: '/'
  },
    { 
    id: 'notif-4', 
    icon: Wallet,
    title: 'Points Added',
    description: 'You earned 120 points for your recent plastic bottle pickup.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true,
    href: '/profile/wallet'
  },
];
