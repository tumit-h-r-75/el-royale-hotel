import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingState } from '../types/hotel';

interface BookingContextType {
  state: BookingState;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (adults: number, children: number) => void;
  selectUnit: (unitId: string) => void;
  selectRatePlan: (ratePlanId: string) => void;
  toggleAddOn: (addOnId: string, quantity: number) => void;
  setGuestDetails: (details: NonNullable<BookingState['guestDetails']>) => void;
  setPromoCode: (code: string) => void;
  holdSecondsRemaining: number;
  resetHoldTimer: () => void;
  isMember: boolean;
  setIsMember: (val: boolean) => void;
  formatMoney: (amount: number) => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Compute default dates: 7 days from now, 3 nights stay
  const now = new Date();
  const defaultCheckInDate = new Date(now);
  defaultCheckInDate.setDate(defaultCheckInDate.getDate() + 7);
  const defaultCheckOutDate = new Date(defaultCheckInDate);
  defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 3);

  const defaultCheckIn = defaultCheckInDate.toISOString().split('T')[0];
  const defaultCheckOut = defaultCheckOutDate.toISOString().split('T')[0];

  const [state, setState] = useState<BookingState>({
    checkIn: defaultCheckIn,
    checkOut: defaultCheckOut,
    adults: 2,
    children: 0,
    selectedAddOns: [],
    promoCode: ''
  });

  const [holdSecondsRemaining, setHoldSecondsRemaining] = useState<number>(900); // 15 mins
  const [isMember, setIsMember] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHoldSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const resetHoldTimer = () => {
    setHoldSecondsRemaining(900);
  };

  const setDates = (checkIn: string, checkOut: string) => {
    setState((prev) => ({ ...prev, checkIn, checkOut }));
  };

  const setGuests = (adults: number, children: number) => {
    setState((prev) => ({ ...prev, adults, children }));
  };

  const selectUnit = (unitId: string) => {
    setState((prev) => ({ ...prev, selectedUnitId: unitId }));
  };

  const selectRatePlan = (ratePlanId: string) => {
    setState((prev) => ({ ...prev, selectedRatePlanId: ratePlanId }));
  };

  const toggleAddOn = (addOnId: string, quantity: number) => {
    setState((prev) => {
      const filtered = prev.selectedAddOns.filter((a) => a.addOnId !== addOnId);
      if (quantity > 0) {
        return { ...prev, selectedAddOns: [...filtered, { addOnId, quantity }] };
      }
      return { ...prev, selectedAddOns: filtered };
    });
  };

  const setGuestDetails = (details: NonNullable<BookingState['guestDetails']>) => {
    setState((prev) => ({ ...prev, guestDetails: details }));
  };

  const setPromoCode = (promoCode: string) => {
    setState((prev) => ({ ...prev, promoCode }));
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        setDates,
        setGuests,
        selectUnit,
        selectRatePlan,
        toggleAddOn,
        setGuestDetails,
        setPromoCode,
        holdSecondsRemaining,
        resetHoldTimer,
        isMember,
        setIsMember,
        formatMoney
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};
