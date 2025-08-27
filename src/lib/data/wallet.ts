
import type { Transaction, RedemptionCategory } from "@/lib/types";

export const userPoints = 5450;

export const transactionHistory: Transaction[] = [
  { id: 'txn-1', date: '2024-05-15T10:30:00Z', description: 'Pickup: Plastic Bottles', points: 120 },
  { id: 'txn-2', date: '2024-05-14T14:00:00Z', description: 'Redeemed: GoFood Voucher $5', points: -5000 },
  { id: 'txn-3', date: '2024-05-12T09:00:00Z', description: 'Pickup: Cardboard Boxes', points: 40 },
  { id: 'txn-4', date: '2024-05-10T11:45:00Z', description: 'Pickup: Newspapers', points: 50 },
];

export const redemptionCategories: RedemptionCategory[] = [
  {
    id: 'e-wallets',
    name: 'E-Wallets',
    items: [
      { id: 'dana-5', name: 'DANA Balance $5', points: 5000, icon: '/images/wallet-icons/dana.svg' },
      { id: 'ovo-5', name: 'OVO Balance $5', points: 5000, icon: '/images/wallet-icons/ovo.svg' },
      { id: 'gopay-5', name: 'GoPay Balance $5', points: 5000, icon: '/images/wallet-icons/gopay.svg' },
      { id: 'dana-10', name: 'DANA Balance $10', points: 10000, icon: '/images/wallet-icons/dana.svg' },
    ]
  },
  {
    id: 'vouchers',
    name: 'Vouchers',
    items: [
      { id: 'gofood-5', name: 'GoFood Voucher $5', points: 5000, icon: '/images/wallet-icons/gofood.svg' },
      { id: 'tokopedia-10', name: 'Tokopedia Voucher $10', points: 10000, icon: '/images/wallet-icons/tokopedia.svg' },
      { id: 'shopee-5', name: 'Shopee Voucher $5', points: 5500, icon: '/images/wallet-icons/shopee.svg' },
    ]
  }
];
