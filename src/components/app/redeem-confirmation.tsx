
'use client';

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import type { RedemptionOption } from '@/lib/types';
import { Star, AlertTriangle } from 'lucide-react';

type RedeemConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  item: RedemptionOption | null;
  userPoints: number;
  onConfirm: () => void;
};

export function RedeemConfirmation({ isOpen, onClose, item, userPoints, onConfirm }: RedeemConfirmationProps) {
  if (!item) return null;

  const hasEnoughPoints = userPoints >= item.points;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Redemption</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to redeem your points. Please review the details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
            <p className="font-semibold text-lg">{item.name}</p>
            <div className="flex items-center gap-2 mt-2 text-primary">
                <Star className="w-5 h-5"/>
                <span className="font-bold text-xl">{item.points.toLocaleString()}</span>
                <span>points</span>
            </div>
             {!hasEnoughPoints && (
                <div className="mt-4 flex items-center gap-2 text-destructive p-3 bg-destructive/10 rounded-md">
                    <AlertTriangle className="h-5 w-5"/>
                    <p className="font-medium">You do not have enough points for this item.</p>
                </div>
            )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={!hasEnoughPoints}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
