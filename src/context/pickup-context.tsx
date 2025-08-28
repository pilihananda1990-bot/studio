
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PickupStatus, DriverDetails, PickupDetails } from '@/lib/types';

interface PickupContextType {
  pickupStatus: PickupStatus;
  driverDetails: DriverDetails | null;
  pickupDetails: PickupDetails | null;
  startPickup: (details: PickupDetails) => void;
  assignDriver: (driver: DriverDetails) => void;
  completePickup: () => void;
}

const PickupContext = createContext<PickupContextType | undefined>(undefined);

export const PickupProvider = ({ children }: { children: ReactNode }) => {
  const [pickupStatus, setPickupStatus] = useState<PickupStatus>('idle');
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const [pickupDetails, setPickupDetails] = useState<PickupDetails | null>(null);

  const startPickup = (details: PickupDetails) => {
    setPickupDetails(details);
    setPickupStatus('searching');
    setDriverDetails(null);
  };

  const assignDriver = (driver: DriverDetails) => {
    if (pickupStatus === 'searching') {
      setDriverDetails(driver);
      setPickupStatus('confirmed');
    }
  };

  const completePickup = () => {
    setPickupStatus('completed');
    // After a short delay, reset to idle to allow for UI transitions
    setTimeout(() => {
        setPickupStatus('idle');
        setDriverDetails(null);
        setPickupDetails(null);
    }, 2000)
  };

  return (
    <PickupContext.Provider value={{ pickupStatus, driverDetails, pickupDetails, startPickup, assignDriver, completePickup }}>
      {children}
    </PickupContext.Provider>
  );
};

export const usePickup = (): PickupContextType => {
  const context = useContext(PickupContext);
  if (context === undefined) {
    throw new Error('usePickup must be used within a PickupProvider');
  }
  return context;
};
