import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingState } from '../types/hotel';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'JPY';

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
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  tempUnit: 'F' | 'C';
  setTempUnit: (u: 'F' | 'C') => void;
  toggleTempUnit: () => void;
  convertTemp: (fDeg: number) => string;
  ambientAudioPlaying: boolean;
  toggleAmbientAudio: () => void;
  formatMoney: (amount: number) => string;
}

const CURRENCY_RATES: Record<CurrencyCode, { rate: number; locale: string; symbol: string }> = {
  USD: { rate: 1.0, locale: 'en-US', symbol: '$' },
  EUR: { rate: 0.92, locale: 'de-DE', symbol: '€' },
  GBP: { rate: 0.79, locale: 'en-GB', symbol: '£' },
  CAD: { rate: 1.36, locale: 'en-CA', symbol: 'CA$' },
  JPY: { rate: 155.0, locale: 'ja-JP', symbol: '¥' }
};

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
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [ambientAudioPlaying, setAmbientAudioPlaying] = useState<boolean>(false);

  // Audio Context reference for ambient grounds sound
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const audioNodesRef = React.useRef<{ [key: string]: any }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setHoldSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup ambient audio on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === 'F' ? 'C' : 'F'));
  };

  const convertTemp = (fDeg: number): string => {
    if (tempUnit === 'C') {
      const cDeg = Math.round(((fDeg - 32) * 5) / 9);
      return `${cDeg}°C`;
    }
    return `${fDeg}°F`;
  };

  const toggleAmbientAudio = () => {
    if (ambientAudioPlaying) {
      // Stop
      try {
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.suspend();
        }
      } catch {
        // ignore
      }
      setAmbientAudioPlaying(false);
    } else {
      // Start or Resume synthetic serene ambient breeze & water fountain
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;

        if (!audioContextRef.current) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          // Pink noise buffer generator (for gentle fountain & citrus breeze)
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Gentle low-pass filter (warm soft water whisper)
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(420, ctx.currentTime);

          // Soft master gain
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.08, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          whiteNoise.start(0);
          audioNodesRef.current = { whiteNoise, gain };
        } else if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        setAmbientAudioPlaying(true);
      } catch (err) {
        console.error('Ambient audio error:', err);
      }
    }
  };

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

  const formatMoney = (amountInUSD: number) => {
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = Math.round(amountInUSD * config.rate);
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(converted);
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
        currency,
        setCurrency,
        tempUnit,
        setTempUnit,
        toggleTempUnit,
        convertTemp,
        ambientAudioPlaying,
        toggleAmbientAudio,
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
